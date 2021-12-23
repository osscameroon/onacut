import React from "react";
import { MyText } from "../myText/MyText.component";
import home from "../../assets/img/epingle.png";
import time from "../../assets/img/time.png";
import lighting from "../../assets/img/bolt.png";
import calendar from "../../assets/img/calendar.png";
import city from "../../assets/img/city.png";

export const CityDetail = (props: any) => {
    return (
        <div className="site__detail border mt-4 p-4 w-full">
            <div className="site__detail-item flex items-center">
                <img src={home} alt="" className="w-6 h-6 mr-3" />
                <MyText
                    variant="title"
                    myText={props.ville}
                    myTextColor="text-ind"
                />
            </div>
            <div className="site__detail-item mt-4 flex items-center">
                <img src={city} alt="" className="w-6 h-6 mr-3" />
                <MyText
                    variant="normal"
                    myText={props.quartier}
                    myTextColor="text-gray-300"
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
                    />
                </div>
            </div>
        </div>
    );
};
