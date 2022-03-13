import React, { Suspense, useState } from "react";
import { useRecoilValue } from "recoil";
import { CityDetail } from "../../components/cityDetail/CityDetail.component";
import { MyDrawer } from "../../components/drawer/Drawer.component";
import { MyText } from "../../components/myText/MyText.component";
import home from "../../assets/img/hotel.png";
import list from "../../assets/img/list.png";
import { Search } from "../../components/search/Search.component";
import { LANGUAGE } from "../../constants/language";
import { NotFound } from "../../components/notFound/NotFound.component";
import { alertsState } from "../../atoms/alerts";
import { Link } from "react-router-dom";

const Detail = () => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get("s");
    const [searchQuery, setSearchQuery] = useState(query || "");
    const alerts = useRecoilValue(alertsState);
    const filteCities = (cities: any, query: any) => {
        if (!query) {
            return cities;
        }

        return cities.filter((region: any) => {
            const cityName = region.district.toLowerCase();
            return cityName.includes(query);
        });
    };

    const filteredCities = filteCities(alerts, searchQuery);
    const title: any = Array.from(alerts)[0];
    while (typeof alerts !== "object") {
        return (
            <Suspense fallback="chargement...">
                <NotFound />;
            </Suspense>
        );
    }

    return (
        <Suspense fallback="chargement..">
            <div className="site__conseils bg-cover w-auto h-screen">
                <div className="px-4 md:px-20 pt-5 md:pt-0">
                    <div className="container mx-auto">
                        <header className="site__detail-header flex justify-between items-center">
                            <MyDrawer />
                            <Link to="/lists">
                                <button className="flex items-center">
                                    <img
                                        alt="menu"
                                        className={`w-8 md:w-12 bg-cover h-auto mt-2 md:mt-4 md:mr-40 border-ind border-solid px-1 pt-2`}
                                        src={list}
                                    />
                                </button>
                            </Link>
                        </header>
                        <main className="site__main pt-8 md:pt-20 px-4 pb-6 md:px-40 z-0">
                            <div className=" sticky z-50 top-0 left-0">
                                <Search
                                    placeholder={LANGUAGE.list.city}
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
                                    myText={`${title?.region}`}
                                    myTextColor="text-ind"
                                    textUppercase="uppercase"
                                />
                            </div>
                            {filteredCities.map((item: any, index: any) => (
                                <CityDetail
                                    key={index}
                                    ville={item?.city}
                                    observations={item?.observations}
                                    calendar={item?.date}
                                    quartier={item?.district}
                                    debut={item?.begin_time}
                                    fin={item?.end_time}
                                />
                            ))}
                        </main>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default Detail;
