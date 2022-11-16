import React from "react";
import { Link } from "react-router-dom";
import lighting from "../../assets/img/lighting.png";
import { MyText } from "../myText/MyText.component";

export const City = (props: any) => {
    return (
        <div className="site__country">
            <div
                style={{ borderColor: "#cecece" }}
                className={`site__country-item pb-2 mb-4 md:mb-8 flex  justify-between ${props.myMb} items-center`}
            >
                <div
                    onClick={props.myClick}
                    className="site__country-blogOne flex"
                >
                    <img src={lighting} className="w-6 h-6 mr-4" alt="" />
                    <Link
                        onClick={props.myClick}
                        to={`/app/details/${props.region}`}
                    >
                        <MyText
                            variant="normal"
                            myText={props.country}
                            myTextColor="text-white"
                            textUppercase="uppercase"
                        />
                    </Link>
                </div>
                <div className="site__country-blogTwo">
                    <MyText
                        variant="normal"
                        myText={props.total}
                        myTextColor="text-ind"
                    />
                </div>
                <p className="text-white">
                    {props.alert_count}
                </p>
            </div>
        </div>
    );
};
