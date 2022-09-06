import React from "react";
import { Link } from "react-router-dom";
import error from "../../assets/img/error.png";
import { MyText } from "../myText/MyText.component";
import { useTranslation } from "react-i18next";

export const NotFound = () => {
    const { t } = useTranslation();
    return (
        <div className="site__notFound flex justify-center items-center h-screen flex-col">
            <img src={error} alt="error" className="h-1/4 w-auto" />
            <div className="w-full md:w-1/3 py-6">
                <MyText
                    variant="title"
                    myText={t("notAvailable")}
                    myTextColor="text-ind"
                    myTextAlign="text-center"
                />
                <MyText
                    variant="normal"
                    myText={t("warning")}
                    myTextColor="text-ind"
                    myTextAlign="text-center"
                />
            </div>
            <div className="site__btn bg-ind px-4 w-11/12 md:w-1/4 rounded-3xl mt-3 py-2 flex justify-center items-center">
                <Link to="/" className="w-full text-center">
                    <p
                        className="text-gray-300"
                        style={{ fontFamily: " 'Varela Round', sans-serif" }}
                    >
                        {t("homePage")}
                    </p>
                </Link>
            </div>
        </div>
    );
};
