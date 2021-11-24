import React, { useEffect } from "react";
import { MyText } from "../../components/myText/MyText.component";
import "react-modern-drawer/dist/index.css";
import { MyDrawer } from "../../components/drawer/Drawer.component";
import technique from "../../assets/img/technique.png";
import { LANGUAGE } from "../../constants/language";
import { StreetMap } from "../streetMap/StreetMap.page";

export const Home = () => {
  useEffect(() => {
    document.title = LANGUAGE.home.title;
  });
  return (
    <div className="site h-screen">
      <div className="fixed z-10 px-4 md:px-20 pt-5 md:pt-0">
        <div className="container mx-auto">
          <MyDrawer justify="start" />
        </div>
      </div>
      <main className="site__main">
        <StreetMap />
      </main>
    </div>
  );
};
