import React, { useEffect, useState } from "react";
import { MyText } from "../../components/myText/MyText.component";
import "react-modern-drawer/dist/index.css";
import { MyDrawer } from "../../components/drawer/Drawer.component";
import technique from "../../assets/img/technique.png";
import { LANGUAGE } from "../../constants/language";

export const Home = () => {
  useEffect(() => {
    document.title = LANGUAGE.home.title;
  });
  return (
    <div className="site bg-cover w-auto h-screen bg-hero">
      <div className="px-4 md:px-20">
        <div className="container mx-auto">
          <MyText
            variant="normal"
            myText="Hello Text"
            myTextColor="text-black"
          />
          <div className="site__header flex items-center justify-between md:justify-start">
            <div
              style={{ borderWidth: "2px", borderColor: "#ff4f00" }}
              className="site__header-panne px-6 py-2 rounded-full  flex items-center"
            >
              <img className="w-6 h-auto mr-2" src={technique} alt="" />
              <MyText
                variant="subTitle"
                myText="Panne électrique"
                myTextColor="text-ind"
              />
            </div>
            <MyDrawer />
          </div>
        </div>
      </div>
    </div>
  );
};
