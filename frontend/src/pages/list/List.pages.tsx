import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { dataState } from "../../atoms/data";
import { City } from "../../components/city/City.component";
import { MyDrawer } from "../../components/drawer/Drawer.component";
import { MyText } from "../../components/myText/MyText.component";
import { LANGUAGE } from "../../constants/language";
import fetchData from "../../scripts/alerts.json";

export const List = () => {
  const [d, setD] = useRecoilState(dataState);
  const uniqueRegion = Array.from(
    new Set(
      fetchData.map((a) => {
        return a.region;
      })
    )
  ).map((id) => {
    setD((d) => fetchData);
    return fetchData.find((a) => a.region === id);
  });

  console.log(
    "REGION::::",
    uniqueRegion.map((i: any) => i.region)
  );

  return (
    <div className="site__list bg-cover w-auto h-screen bg-hero ">
      <div className="px-4 md:px-20 pt-5 md:pt-0">
        <div className="container mx-auto">
          <MyDrawer />
          <main className="site__main pt-8 px-4 md:px-40">
            <MyText
              variant="title"
              myText={LANGUAGE.list.title}
              myTextColor="text-white"
            />
            <div className="site__list-items pt-8 md:pt-24  ">
              {uniqueRegion.map((i: any) => (
                <City
                  region={i?.region}
                  myMb="border-b"
                  full={i}
                  country={i?.region}
                  total={i?.length}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
