import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { regionState } from "../../atoms/regions";
import { City } from "../../components/city/City.component";
import { MyDrawer } from "../../components/drawer/Drawer.component";
import { Search } from "../../components/search/Search.component";
import { LANGUAGE } from "../../constants/language";
import { alertsState } from "../../atoms/alerts";
import { getRegions } from "../../atoms/regions";
import { NotFound } from "../../components/notFound/NotFound.component";
import { Link } from "react-router-dom";
import accueil from "../../assets/img/accueil.png";

const List = () => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get("s");
    const [searchQuery, setSearchQuery] = useState(query || "");
    const myRegions: any = useRecoilValue(getRegions);
    const alerts: any = useRecoilValue(alertsState);
    const [alert, setAlert] = useRecoilState(alertsState);
    const [region, setRegion] = useRecoilState(regionState);
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
        setRegion((region) => (region = uniqueRegion));
    }, []);
    const filteredRegions = filteRegions(region, searchQuery);
    return (
        <div className="site__list bg-cover w-auto h-screen  ">
            <div className="px-4 md:px-20 pt-5 md:pt-0">
                <div className="container mx-auto">
                    <header className="site__lists-header flex justify-between items-center">
                        <MyDrawer />
                        <Link to="/">
                            <button className="flex items-center">
                                <img
                                    alt="menu"
                                    className={`w-8 md:w-12 bg-cover h-auto mt-2 md:mt-4 md:mr-40 border-ind border-solid px-1 pt-2`}
                                    src={accueil}
                                />
                            </button>
                        </Link>
                    </header>
                    <main className="site__main pt-8 md:pt-20 px-4 pb-6 md:px-40">
                        <Search
                            placeholder={LANGUAGE.list.search}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                        {filteredRegions.map((item: any) => (
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
                            />
                        ))}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default List;
