import React from "react";
import { useRecoilValue } from "recoil";
import { dataState } from "../../atoms/data";
import { CityDetail } from "../../components/cityDetail/CityDetail.component";
import { MyDrawer } from "../../components/drawer/Drawer.component";
import { MyText } from "../../components/myText/MyText.component";
import home from "../../assets/img/hotel.png";
import { type } from "os";

export const Detail = () => {
  const v: any = useRecoilValue(dataState);
  const title: any = Array.from(v)[0];
  return (
    <div className="site__conseils bg-cover w-auto h-screen bg-hero ">
      <div className="px-4 md:px-20 pt-5 md:pt-0">
        <div className="container mx-auto">
          <MyDrawer />
          <main className="site__main pt-8 px-4 md:px-40">
            <div className="site__detail-item flex items-center">
              <img src={home} alt="" className="w-10 h-10 mr-3" />
              <MyText
                variant="title"
                myText={`${title?.region}`}
                myTextColor="text-ind"
              />
            </div>
            {v.map((i: any) => (
              <CityDetail
                ville={i?.ville}
                observations={i?.observations}
                calendar={i?.prog_date}
                debut={i?.prog_heure_debut}
                fin={i?.prog_heure_fin}
              />
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};