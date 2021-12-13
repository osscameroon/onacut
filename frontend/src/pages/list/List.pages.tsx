import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { dataState } from "../../atoms/data";
import { regionState } from "../../atoms/regions";
import { City } from "../../components/city/City.component";
import { MyDrawer } from "../../components/drawer/Drawer.component";
import { Search } from "../../components/search/Search.component";
import { LANGUAGE } from "../../constants/language";
import alerts from "../../scripts/alerts.json";

const printByRegion = (name: any): any => {
    return alerts.filter((alert) => alert.region === name);
};

export const List = () => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get("s");
    const [searchQuery, setSearchQuery] = useState(query || "");

    const [alert, setAlert] = useRecoilState(dataState);
    const [region, setRegion] = useRecoilState(regionState);
    const uniqueRegion: any = Array.from(
        new Set(
            alerts.map((a) => {
                return a.region;
            })
        )
    ).map((id) => {
        return alerts.find((a) => a.region === id);
    });

    const filteRegions = (regions: any, query: any) => {
        if (!query) {
            return regions;
        }

        return regions.filter((region: any) => {
            const regionName = region.region.toLowerCase();
            return regionName.includes(query);
        });
    };
    useEffect(() => {
        setRegion((region) => (region = uniqueRegion));
    }, []);
    const filteredRegions = filteRegions(region, searchQuery);
    return (
        <div className="site__list bg-cover w-auto h-screen  ">
            <div className="px-4 md:px-20 pt-5 md:pt-0">
                <div className="container mx-auto">
                    <MyDrawer />
                    <main className="site__main pt-8 md:pt-20 px-4 pb-6 md:px-40">
                        <Search
                            placeholder={LANGUAGE.list.search}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                        {filteredRegions.map((item: any) => (
                            <City
                                key={item.region}
                                myClick={() =>
                                    setAlert(
                                        (alert: any) =>
                                            (alert = printByRegion(
                                                item?.region
                                            ))
                                    )
                                }
                                region={item?.region}
                                myMb="border-b"
                                country={item?.region}
                                quartier={item?.quartier}
                                total={item?.length}
                            />
                        ))}
                    </main>
                </div>
            </div>
        </div>
    );
};
