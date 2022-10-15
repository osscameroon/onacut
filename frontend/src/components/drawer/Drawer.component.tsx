import React, {useState} from "react";
import {ITEMS} from "../../assets/data/Items.data";
import Drawer from "react-modern-drawer";
import menu from "../../assets/img/menu.png";
import {useTranslation} from "react-i18next";
import {Box} from "@mui/material";
import {useHistory} from "react-router-dom";

export const MyDrawer = (props: any) => {
    const {t, i18n} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        console.log("problem herer");
        setIsOpen((prevState) => !prevState);
    };

    const router = useHistory();

    const changeLanguage = () => {
        i18n.changeLanguage(i18n.language == "en" ? "fr" : "en").then();
    };



    return (
        <div
            className={`site__drawer p-2 flex items-center justify-${props.justify}`}
        >
            <button className="flex items-center" onClick={toggleDrawer}>
                <img
                    alt="menu"
                    className={`w-8 md:w-12  bg-cover h-auto mt-2 md:mt-4 md:ml-40 border-ind border-solid px-1 pt-2`}
                    src={menu}
                />
            </button>
            <Drawer
                size={350}
                style={{backgroundColor: "#FF4F00"}}
                open={isOpen}
                onClose={toggleDrawer}
                direction="left"
            >
                <div className="p-4 md:p-10">
                    {ITEMS.map((i: any) => (
                        <div
                            onClick={() => {
                                toggleDrawer();
                                router.push(i.link)
                            }}
                            key={i?.name}
                            style={{borderColor: "#cecece", cursor: "pointer"}}
                            className="drawer__item border-b items-center flex pt-6 md:pt-10 pb-4"
                        >
                            <img
                                alt="icon"
                                src={i.icon}
                                className="w-7 h-auto"
                            />
                            <div
                                className="pl-4"
                                style={{
                                    color: "#fefefe",
                                    fontFamily: " 'Varela Round', sans-serif",
                                }}
                            >
                                {t(i.name)}
                            </div>
                        </div>
                    ))}

                    <div
                        onClick={() => {
                            changeLanguage()
                        }}
                        style={{borderColor: "#cecece", cursor: "pointer"}}
                        className="drawer__item border-b items-center flex pt-6 md:pt-10 pb-4"
                    >
                        <img
                            alt="icon"
                            src={"/img/language.png"}
                            className="w-7 h-auto"
                        />
                        <Box

                            className="pl-4"
                            style={{
                                color: "#fefefe",
                                fontFamily: " 'Varela Round', sans-serif",
                            }}
                        >
                            {t("drawer_menu_lang")}
                        </Box>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};
