import React, { useState } from "react";
import { CityDetail } from "../../components/cityDetail/CityDetail.component";
import { MyText } from "../../components/myText/MyText.component";
import home from "../../assets/img/hotel.png";
import { Search } from "../../components/search/Search.component";
import boxImg from "../../assets/img/box.png";
import { useRecoilValue } from "recoil";
import { NotFound } from "../../components/notFound/NotFound.component";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { Grid } from "@mui/material";
import { AlertService } from "../../services/api";

const PER_PAGE = 9;

const Detail = () => {
    const { t } = useTranslation();
    const { search } = window.location;
    const details: any = useRecoilValue(AlertService.getDetails);
    const query = new URLSearchParams(search).get("s");
    const [searchQuery, setSearchQuery] = useState(query || "");
    const [currentPage, setCurrentPage] = useState(0);
    const filteCities = (cities: any, query: any) => {
        if (!query) {
            return cities;
        }
        return cities.filter((region: any) => {
            const cityName = region.district.toLowerCase();
            return cityName.includes(query);
        });
    };
    const title: any = localStorage.getItem("myRegionName");
    const filteredCities = filteCities(details.data, searchQuery);

    function handlePageClick({ selected: selectedPage }: any) {
        setCurrentPage(selectedPage);
    }

    const offset = currentPage * PER_PAGE;

    const currentPageData = filteredCities
        .slice(offset, offset + PER_PAGE)
        .map((item: any) => item);

    const pageCount = Math.ceil(filteredCities.length / PER_PAGE);


    if (details?.status === 200) {
        if (details?.data.length === 0) {
            return (
                <main className="">
                    <div
                        className="site__detail__box-empty flex flex-col items-center justify-center pt-6 md:pt-10">
                        <img src={boxImg} className="w-28 h-28" />
                        <p
                            style={{
                                fontFamily:
                                    " 'Varela Round', sans-serif",
                            }}
                            className="text-white pt-4"
                        >
                            {t("empty")}
                        </p>
                    </div>
                </main>
            );
        }
        return (
            <main>
                <div className=" sticky z-50 top-0 left-0">
                    <Search
                        placeholder={t("city")}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </div>
                <div className="site__detail-item flex items-center">
                    <img
                        src={home}
                        alt=""
                        className="w-10 h-10 mr-3"
                    />
                    <MyText
                        variant="title"
                        myText={`${title}`}
                        myTextColor="text-ind"
                        textUppercase="uppercase"
                    />
                </div>
                <Grid
                    container spacing={2}
                    alignItems={"stretch"}
                    justifyContent={"flex-start"}
                >
                    {currentPageData.map((item: any, index: any) => (
                        <Grid
                            item
                            key={`grid_index_${index}`}
                            xs={12}
                            lg={4}
                        >
                            <CityDetail
                                key={index}
                                ville={item?.city}
                                long={item?.longitude}
                                lat={item?.lattitude}
                                observations={item?.observations}
                                calendar={item?.date}
                                quartier={item?.district}
                                debut={item?.begin_time}
                                fin={item?.end_time}
                            />
                        </Grid>
                    ))}
                </Grid>
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
        );
    }
    return <NotFound />;
};

export default Detail;
