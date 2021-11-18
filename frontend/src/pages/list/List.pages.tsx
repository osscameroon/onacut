import React from "react";
import { City } from "../../components/city/City.component";
import { MyDrawer } from "../../components/drawer/Drawer.component";
import { MyText } from "../../components/myText/MyText.component";
import { LANGUAGE } from "../../constants/language";
import fetchData from "../../scripts/alerts.json";

const uniqueRegion = Array.from(new Set(fetchData.map((a) => a.region))).map(
  (id) => {
    return fetchData.find((a) => a.region === id);
  }
);

export const List = () => {
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
                <City myMb="border-b" country={i.region} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
