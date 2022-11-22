import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { City } from "../../components/city/City.component";
import { Search } from "../../components/search/Search.component";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import CityService, { regionState } from "../../services/api/CityService";
import { alertsState } from "../../services/api/AlertService";
import { Box } from "@mui/material";

const PER_PAGE = 5;

const List = () => {
    const { t } = useTranslation();
    const { search } = window.location;
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

    function handlePageClick({ selected: selectedPage }: any) {
        setCurrentPage(selectedPage);
    }

    const offset = currentPage * PER_PAGE;

    const currentPageData = filteredRegions
        .slice(offset, offset + PER_PAGE)
        .map((item: any) => item);

    const pageCount = Math.ceil(filteredRegions.length / PER_PAGE);

    return (
        <div>
            <Search
                placeholder={t("search")}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <Box sx={{ pt: 6 }}>
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
                            alert_count={item?.total_alerts}
                        />
                    )
                }
                )}
            </Box>

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
        </div>
    );
};

export default List;
