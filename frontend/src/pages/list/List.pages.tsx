import React, { useState, useEffect } from "react";
import { COUNTRY } from "../../assets/data/Country.data";
import { City } from "../../components/city/City.component";
import { MyDrawer } from "../../components/drawer/Drawer.component";
import { MyText } from "../../components/myText/MyText.component";
import { LANGUAGE } from "../../constants/language";
// import { RegionService } from "../../services/regions.service";

export const List = () => {
  // const [data, setData] = useState([]);
  // const [region, setRegion] = useState([]);
  // const [loader, setLoader] = useState(false);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await RegionService.regions(`1`);
  //     console.log(result);
  //     const result = await RegionService.regions(`${regionId}`);
  //     setLoader(true);
  //     setRegion(await result.data);
  //     await result;
  //   };
  //   fetchData();
  // }, []);
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
              {COUNTRY.map((i: any) => (
                <City myMb="border-b" country={i.name} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
