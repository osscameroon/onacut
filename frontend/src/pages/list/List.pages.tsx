import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { regionState } from "../../atoms/regions";
import { City } from "../../components/city/City.component";
import { MyDrawer } from "../../components/drawer/Drawer.component";
import { Search } from "../../components/search/Search.component";
import { LANGUAGE } from "../../constants/language";
import { alertsState, getAlerts } from "../../atoms/alerts";
import { NotFound } from "../../components/notFound/NotFound.component";

const List = () => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get("s");
    const [searchQuery, setSearchQuery] = useState(query || "");
    const myAlerts: any = useRecoilValue(getAlerts);
    console.log("MY ALERT::::", myAlerts);
    const [alert, setAlert] = useRecoilState(alertsState);
    const [region, setRegion] = useRecoilState(regionState);
    const printByRegion = (name: any): any => {
        return myAlerts?.data.filter((alert: any) => alert.region === name);
    };
    const uniqueRegion: any = Array.from(
        new Set(
            myAlerts?.data.map((a: any) => {
                return a.region;
            })
        )
    ).map((id) => {
        return myAlerts?.data.find((a: any) => a.region === id);
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
    if (myAlerts?.status !== 200) {
        return <NotFound />;
    }
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
                                quartier={item?.district}
                                total={item?.length}
                            />
                        ))}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default List;
