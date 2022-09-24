import React, { useEffect, useState } from "react";
import "react-modern-drawer/dist/index.css";
import { MyDrawer } from "../../components/drawer/Drawer.component";
import bolt from "../../assets/img/bolt.png";
import { Link } from "react-router-dom";
import HomeModal from "../homeModal/HomeModal.pages";
import StreetMap from "../streetMap/StreetMap.page";
import { useRecoilValue } from "recoil";
import { panneBtnState } from "../../atoms/panne_btn";
import LanguageSelector from "../../languageSelect";
import { useTranslation } from "react-i18next";

const Home = () => {
    const { t } = useTranslation();
    let open = localStorage.getItem("modalValue");
    let panneBtnZIndex = useRecoilValue(panneBtnState);
    useEffect(() => {
        document.title = t("title")
    });
    if (open === null) {
        return (
            <div className="h-screen site">
                <HomeModal />
                <div className="fixed z-10 px-4 pt-5 md:px-20 md:pt-0">
                    <div className="container mx-auto">
                        <div className="flex items-center justify-center">
                            <MyDrawer justify="start" />
                            <div className="px-2 py-2 mt-3 ml-4 site__btn-panne md:ml-20 bg-ind rounded-3xl">
                                <Link to="/lists">
                                    <p
                                        style={{
                                            fontFamily:
                                                " 'Varela Round', sans-serif",
                                        }}
                                        className="flex px-4 py-2 text-gray-200"
                                    >
                                        <img
                                            src={bolt}
                                            alt=""
                                            className="w-6 h-6 mr-2"
                                        />
                                       {t("panel")}
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 z-10 px-4 pb-4 md:px-20 ">
                    <div className="container mx-auto">
                        <div className="px-2 py-1 mt-3 ml-4 site__btn-panne md:ml-20 bg-ind rounded-3xl">
                            <p
                                style={{
                                    fontFamily: " 'Varela Round', sans-serif",
                                }}
                                className="flex px-4 py-1 text-gray-200"
                            >
                                <img
                                    src={bolt}
                                    alt=""
                                    className="w-6 h-6 mr-2"
                                />
                                <Link to={'/add-alert'}>
                                   {t("reportOutage")}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <main className="site__main">
                    <StreetMap />
                </main>
            </div>
        );
    } else {
        return (
            <div className="h-screen site">
                <div className="fixed z-10 px-4 pt-5 md:px-20 md:pt-0">
                    <div className="container mx-auto">
                        <div className="flex items-center justify-center">
                            <MyDrawer justify="start" />
                            <div  className="text-white">
                                <LanguageSelector/>
                            </div>
                            
                            <div className="px-2 py-2 mt-3 ml-4 site__btn-panne md:ml-20 bg-ind rounded-3xl">
                                <Link to="/lists">
                                    <p
                                        style={{
                                            fontFamily:
                                                " 'Varela Round', sans-serif",
                                        }}
                                        className="flex px-4 py-2 text-gray-200"
                                    >
                                        <img
                                            src={bolt}
                                            alt=""
                                            className="w-6 h-6 mr-2"
                                        />
                                        {t("panel")}
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`absolute bottom-0 z-${panneBtnZIndex} px-4 md:px-20 pb-4 `}
                >
                    <div className="container mx-auto">
                        <div className="px-2 py-1 mt-3 ml-4 site__btn-panne md:ml-20 bg-ind rounded-3xl">
                            <p
                                style={{
                                    fontFamily: " 'Varela Round', sans-serif",
                                }}
                                className="flex px-4 py-1 text-gray-200"
                            >
                                <img
                                    src={bolt}
                                    alt=""
                                    className="w-6 h-6 mr-2"
                                />
                                <Link to={'/add-alert'}>
                                   {t("reportOutage")}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <main className="site__main">
                    <StreetMap />
                </main>
            </div>
        );
    }
};

export default Home;
