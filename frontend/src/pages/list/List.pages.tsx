import React from "react";
import { useRecoilState } from "recoil";
import { dataState } from "../../atoms/data";
import { City } from "../../components/city/City.component";
import { MyDrawer } from "../../components/drawer/Drawer.component";
import { MyText } from "../../components/myText/MyText.component";
import { LANGUAGE } from "../../constants/language";
import alerts from "../../scripts/alerts.json";

const printByRegion = (name: any): any => {
  return alerts.filter((alert) => alert.region === name);
};

export const List = () => {
  const [alert, setAlert] = useRecoilState(dataState);
  const uniqueRegion = Array.from(
    new Set(
      alerts.map((a) => {
        return a.region;
      })
    )
  ).map((id) => {
    return alerts.find((a) => a.region === id);
  });

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
              {uniqueRegion.map((item: any) => (
                <City
                  key={item.region}
                  myClick={() =>
                    setAlert((alert) => (alert = printByRegion(item?.region)))
                  }
                  region={item?.region}
                  myMb="border-b"
                  country={item?.region}
                  quartier={item?.quartier}
                  total={item?.length}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
