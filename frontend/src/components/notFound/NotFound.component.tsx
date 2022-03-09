import React from "react";
import { Link } from "react-router-dom";
import error from "../../assets/img/error.png";
import { LANGUAGE } from "../../constants/language";
import { MyText } from "../myText/MyText.component";

export const NotFound = () => {
    return (
        <div className="site__notFound flex justify-center items-center h-screen flex-col">
            <img src={error} alt="error" className="h-1/4 w-auto" />
            <div className="w-full md:w-1/3 py-6">
                <MyText
                    variant="title"
                    myText={`Ce contenu n’est pas disponible pour le moment`}
                    myTextColor="text-ind"
                    myTextAlign="text-center"
                />
                <MyText
                    variant="normal"
                    myText={`Ce problème vient généralement du fait que le propriétaire ne l’a partagé qu’avec un petit groupe de personnes, a modifié qui pouvait le voir ou l’a supprimé.`}
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
                        {LANGUAGE.notfound.homePage}
                    </p>
                </Link>
            </div>
        </div>
    );
};
