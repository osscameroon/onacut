import React, { useState } from "react";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { dataState } from "../../atoms/data";
import { MyDrawer } from "../../components/drawer/Drawer.component";
import { MyText } from "../../components/myText/MyText.component";

export const Detail = () => {
  let params = useParams();
  console.log(params);

  return (
    <div className="site__conseils bg-cover w-auto h-screen bg-hero ">
      <div className="px-4 md:px-20 pt-5 md:pt-0">
        <div className="container mx-auto">
          <MyDrawer />
          <main className="site__main pt-8 px-4 md:px-40">
            <MyText
              variant="title"
              // myText={myParams}
              myTextColor="text-white"
            />
          </main>
        </div>
      </div>
    </div>
  );
};
