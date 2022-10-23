import React from "react";
import {Link} from "react-router-dom";
import error from "assets/img/error.png";
import {useTranslation} from "react-i18next";
import {MyText} from "../components/myText/MyText.component";
import {Footer} from "../components/footer/Footer.component";

export const NotFound = () => {
    const {t} = useTranslation();
    console.log("ici")
    return (
        <div className="flex flex-col items-center justify-center h-screen site__notFound">
            <img src={error} alt="error" className="w-auto h-1/4"/>
            <div className="w-full py-6 md:w-1/3">
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
            <div
                className="flex items-center justify-center w-11/12 px-4 py-2 mt-3 site__btn bg-ind md:w-1/4 rounded-3xl">
                <Link to="/" className="w-full text-center">
                    <p
                        className="text-gray-300"
                        style={{fontFamily: " 'Varela Round', sans-serif"}}
                    >
                        {t("homePage")}
                    </p>
                </Link>
            </div>
            <Footer/>
        </div>
    );
};

export default NotFound
