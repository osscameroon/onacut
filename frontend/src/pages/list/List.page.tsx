import React, {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {City} from "../../components/city/City.component";
import {MyDrawer} from "../../components/drawer/Drawer.component";
import {Search} from "../../components/search/Search.component";
import {Link} from "react-router-dom";
import accueil from "../../assets/img/accueil.png";
import {useTranslation} from "react-i18next";
import {Footer} from "../../components/footer/Footer.component";
import ReactPaginate from "react-paginate";
import CityService, {regionState} from "../../services/api/CityService";
import {alertsState} from "../../services/api/AlertService";

const PER_PAGE = 5;

const List = () => {
    const {t} = useTranslation();
    const {search} = window.location;
    const query = new URLSearchParams(search).get("s");
    const [searchQuery, setSearchQuery] = useState(query || "");
    const myRegions: any = useRecoilValue(CityService.getRegions);
    const [alert, setAlert] = useRecoilState(alertsState);
    const [region, setRegion] = useRecoilState(regionState);
    const [currentPage, setCurrentPage] = useState(0);
    const printByRegion = (name: any): any => {
        return myRegions?.data.filter((alert: any) => alert.name === name);
    };
    const uniqueRegion: any = Array.from(
        new Set(
            myRegions?.data.map((a: any) => {
                return a.name;
            })
        )
    ).map((id) => {
        return myRegions?.data.find((a: any) => a.name === id);
    });

    const filteRegions = (regions: any, query: any) => {
        if (!query) {
            return regions;
        }

        return regions.filter((region: any) => {
            const regionName = region.name.toLowerCase();
            return regionName.includes(query);
        });
    };
    useEffect(() => {
        setRegion((region) => (region = (uniqueRegion)));
    }, []);
    const filteredRegions = filteRegions(region, searchQuery);

    function handlePageClick({selected: selectedPage}: any) {
        setCurrentPage(selectedPage);
    }

    const offset = currentPage * PER_PAGE;

    const currentPageData = filteredRegions
        .slice(offset, offset + PER_PAGE)
        .map((item: any) => item);

    const pageCount = Math.ceil(filteredRegions.length / PER_PAGE);


    return (
        <div className="w-auto h-screen bg-cover site__list ">
            <div className="px-4 pt-5 md:px-20 md:pt-0">
                <div className="container mx-auto">
                    <header className="flex items-center justify-between site__lists-header">
                        <MyDrawer/>
                        <Link to="/">
                            <button className="flex items-center">
                                <img
                                    alt="menu"
                                    className={`w-8 md:w-12 bg-cover h-auto mt-2 md:mt-4
                                        md:mr-40 border-ind border-solid px-1 pt-2`}
                                    src={accueil}
                                />
                            </button>
                        </Link>
                    </header>
                    <main className="px-4 pt-8 pb-6 site__main md:pt-20 md:px-40">
                        <Search
                            placeholder={t("search")}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                        {currentPageData.map((item: any) => {
                                return (
                                    <City
                                        key={item}
                                        myClick={() => {
                                            setAlert(printByRegion(item?.name));
                                            localStorage.setItem(
                                                "myRegionName",
                                                item?.name
                                            );
                                        }}
                                        region={item?.name}
                                        myMb="border-b"
                                        country={item?.name}
                                        alert_count={item?.num_alerts}
                                    />
                                )
                            }
                        )}
                        {
                            currentPageData.length >= PER_PAGE &&
                            <ReactPaginate
                                previousLabel={"← Previous"}
                                nextLabel={"Next →"}
                                pageCount={pageCount}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination"}
                                previousLinkClassName={"pagination__link"}
                                nextLinkClassName={"pagination__link"}
                                disabledClassName={"pagination__link--disabled"}
                                activeClassName={"pagination__link--active"}
                            />
                        }

                    </main>
                    <Footer/>
                </div>
            </div>
        </div>
    );
};

export default List;
