import React, {useEffect} from "react";
import "react-modern-drawer/dist/index.css";
import StreetMap from "../streetMap/StreetMap.page";
import {useRecoilValue} from "recoil";
import {useTranslation} from "react-i18next";
import {panneBtnState} from "../../atoms";
import {Header} from "../../components";

const Home = () => {
    const {t} = useTranslation();
    let open = localStorage.getItem("modalValue");
    let panneBtnZIndex = useRecoilValue(panneBtnState);

    useEffect(() => {
        document.title = t("title")
    });

    return (
        <div className="h-screen site relative">
            <Header isHome/>
            <main className="site__main">
                <StreetMap/>
            </main>
        </div>
    );
};

export default Home;
