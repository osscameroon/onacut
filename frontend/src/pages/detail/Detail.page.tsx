import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { dataState } from "../../atoms/data";
import { CityDetail } from "../../components/cityDetail/CityDetail.component";
import { MyDrawer } from "../../components/drawer/Drawer.component";
import { MyText } from "../../components/myText/MyText.component";
import home from "../../assets/img/hotel.png";
import { Search } from "../../components/search/Search.component";
import { LANGUAGE } from "../../constants/language";
import { NotFound } from "../../components/notFound/NotFound.component";

export const Detail = () => {
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const alerts = useRecoilValue(dataState);

  console.log(alerts);

  const filteCities = (cities: any, query: any) => {
    if (!query) {
      return cities;
    }

    return cities.filter((region: any) => {
      const cityName = region.quartier.toLowerCase();
      return cityName.includes(query);
    });
  };

  const filteredCities = filteCities(alerts, searchQuery);

  const alert_length = alerts.length;

  if (
    typeof alerts.map((item: any) => item) !== "undefined" &&
    alerts.length > 0
  ) {
    const title: any = Array.from(alerts)[0];
    return (
      <div className="site__conseils bg-cover w-auto h-screen">
        <div className="px-4 md:px-20 pt-5 md:pt-0">
          <div className="container mx-auto">
            <MyDrawer />
            <main className="site__main pt-8 md:pt-20 px-4 pb-6 md:px-40">
              <Search
                placeholder={LANGUAGE.list.city}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <div className="site__detail-item flex items-center">
                <img src={home} alt="" className="w-10 h-10 mr-3" />
                <MyText
                  variant="title"
                  myText={`${title?.region}`}
                  myTextColor="text-ind"
                />
              </div>
              {filteredCities.map((item: any, index: any) => (
                <CityDetail
                  key={index}
                  ville={item?.ville}
                  observations={item?.observations}
                  calendar={item?.prog_date}
                  quartier={item?.quartier}
                  debut={item?.prog_heure_debut}
                  fin={item?.prog_heure_fin}
                />
              ))}
            </main>
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
};
