import React from "react";
import { MyText } from "../myText/MyText.component";
import epingle from "../../assets/img/epingle.png";
import time from "../../assets/img/time.png";
import lighting from "../../assets/img/bolt.png";
import calendar from "../../assets/img/calendar.png";
import city from "../../assets/img/city.png";
import home from "../../assets/img/home.png"
import { LANGUAGE } from "../../constants/language";
import { Link } from "react-router-dom";
import StreetMap from "../../pages/streetMap/StreetMap.page";
import { useTranslation } from "react-i18next";

export const CityDetail = (props: any) => {
    const { t } = useTranslation();
        return (
        <div className="site__detail border mt-4 p-4 w-full">
            <div className="site__detail-item flex items-center">
                <img src={epingle} alt="" className="w-6 h-6 mr-3" />
                <MyText
                    variant="title"
                    myText={props.ville}
                    myTextColor="text-ind"
                    textUppercase="uppercase"
                />
            </div>
            <div className="site__detail-item mt-4 flex items-center">
                <img src={city} alt="" className="w-6 h-6 mr-3" />
                <MyText
                    variant="normal"
                    myText={props.quartier}
                    myTextColor="text-gray-300"
                    textUppercase="uppercase"
                />
            </div>
            <div className="site__detail-item mt-4 flex items-center">
                <img src={lighting} alt="" className="w-6 h-6 mr-3" />
                <MyText
                    variant="normal"
                    myText={props.observations}
                    myTextColor="text-gray-300"
                />
            </div>
            <div className="site__detail-times flex items-center justify-between mt-4">
                <div className="site__detail-item flex items-center">
                    <img src={calendar} alt="" className="w-5 h-5 mr-3" />
                    <MyText
                        variant="item"
                        myText={props.calendar}
                        myTextColor="text-gray-300"
                    />
                </div>
                <div className="site__detail-item flex items-center">
                    <img src={time} alt="" className="w-5 h-5 mr-3" />
                    <MyText
                        variant="item"
                        myText={`${props.debut} - ${props.fin}`}
                        myTextColor="text-gray-300"
                        textUppercase="uppercase"
                    />
                </div>
            </div>
            <div className="mt-4 py-2 bg-ind rounded-3xl flex items-center justify-center" onClick={props.myClick}>
              <Link
                     to={`/?lat=${props.lat
                        }&long=${props.long}`}>
              <button className="px-4 text-white">
                <p className="flex px-2 py-1" >
                    <img src={home} alt={t("location")} className="w-5 h-auto flex items-center justify-center"/>
                    {t("location")} 
                </p>
                </button>
                </Link>
            </div>
        </div>
    );
};
