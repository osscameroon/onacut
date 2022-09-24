import React, { useState, useEffect } from "react";
import "./addAlert.css";
import { MyDrawer } from "../../components/drawer/Drawer.component";
import { Link } from "react-router-dom";
import accueil from "../../assets/img/accueil.png";
import { LANGUAGE } from "../../constants/language";
import { useRecoilValue } from "recoil";
import { getDetails } from "../../atoms/details";
import { getRegions } from "../../atoms/regions";
import { MyText } from "../../components/myText/MyText.component";
import {Footer} from "../../components/footer/Footer.component";

export const AddAlert = () => {
    const details: any = useRecoilValue(getDetails);
    const theDetails = details.data;
    const [theDetailsState, setTheDetailsState] = useState([]);
    const regions: any = useRecoilValue(getRegions);
    const theRegions = regions.data;
    const [userChoice, setUserChoice] = useState(" ");
    const [stateOptions, setStateValues] = useState([]);
    useEffect(() => {
        localStorage.setItem("myRegionName", userChoice);
        console.log(userChoice);
    }, [userChoice]);
    useEffect(() => {
        setTheDetailsState(theDetails);
    }, []);
    useEffect(() => {
        setStateValues(theRegions);
    }, []);
    const defectChoices = {
        water: "Eau",
        electricity: "Electricité",
        internet: "Internet",
    };

    return (
        <div className="w-auto h-screen bg-cover">
            <div className="px-4 pt-5 md:px-20 md:pt-0">
                <div className="container mx-auto">
                    <form method={"post"}>
                        <div className="flex items-center justify-between site__lists-header">
                            <MyDrawer justify="start" />
                            <Link to="/">
                                <button className="flex items-center end">
                                    <img
                                        alt="menu"
                                        className={`w-8 md:w-12 bg-cover h-auto mt-2 md:mt-4
                                        md:mr-40 border-ind border-solid px-1 pt-2`}
                                        src={accueil}
                                    />
                                </button>
                            </Link>
                        </div>
                        <div className="mt-4">
                            <div className="flex flex-col items-center justify-around my-5 md:my-10">
                                <MyText
                                    variant="title"
                                    myText={LANGUAGE.home.signalerPanne}
                                    myTextColor="text-ind"
                                    textUppercase="uppercase"
                                />
                                <p className="text-sm text-white text-gray-200 md:text-base">
                                    {LANGUAGE.home.signalerDescription}
                                </p>
                            </div>
                            <div>
                                <div className="flex flex-col items-center justify-around mt-6 panne md:mt-12">
                                    <p className="w-full text-sm font-normal text-left text-gray-200 md:text-lg md:w-3/4">
                                        {LANGUAGE.list.type}
                                    </p>

                                    <select
                                        className="w-full mt-2 mb-4 border border-grayC rounded-md md:mb-10 md:w-3/4"
                                        style={{ height: "61px" }}
                                        name=""
                                        id="panne"
                                    >
                                        <option
                                            value="0"
                                            disabled
                                            selected
                                            hidden
                                        >
                                            Make a choice
                                        </option>
                                        <option value="">Water</option>
                                        <option value="2">Internet</option>
                                        <option value="3">Electricity</option>
                                    </select>
                                </div>

                                <div className="flex flex-col items-center justify-around">
                                    <p className="w-full text-sm font-normal text-left text-gray-200 md:text-lg md:w-3/4">
                                        {LANGUAGE.list.region}
                                    </p>
                                    <select
                                        className="w-full mt-2 mb-4 border border-grayC rounded-md md:mb-16 md:w-3/4"
                                        style={{ height: "61px" }}
                                        onChange={(e: any) =>
                                            setUserChoice(e.target.value)
                                        }
                                    >
                                        <option
                                            value="0"
                                            disabled
                                            selected
                                            hidden
                                        >
                                            Make a choice
                                        </option>
                                        {stateOptions.map(
                                            (region: any, index) => (
                                                <option
                                                    value={region.name}
                                                    key={region.id}
                                                >
                                                    {region.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                <div className="flex flex-col items-center justify-around">
                                    <p className="w-full text-sm font-normal text-left text-gray-200 md:text-lg md:w-3/4">
                                        {LANGUAGE.list.city}
                                    </p>
                                        <select
                                            className="w-full mt-2 mb-4 border border-grayC rounded-md md:mb-16 md:w-3/4"
                                            style={{ height: "61px" }}
                                            name=""
                                            id="quartier"
                                        >
                                            <option
                                                value="0"
                                                disabled
                                                selected
                                                hidden
                                            >
                                                Choose your quarter
                                            </option>
                                            {theDetailsState.map(
                                                (quarter: any) => {
                                                    return (
                                                        <option
                                                            value={
                                                                quarter.district_id
                                                            }
                                                        >
                                                            {quarter?.district}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                </div>

                                <div className="flex flex-col items-center justify-around">
                                    <p className="w-full text-sm font-normal text-left text-gray-200 md:text-lg md:w-3/4">
                                        {LANGUAGE.list.panne}
                                    </p>

                                    <textarea
                                        className="w-full p-3 mt-2 mb-4 border border-grayC rounded-md md:mb-16 md:w-3/4"
                                        name=""
                                        id="panne"
                                        cols={20}
                                        rows={5}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-around mb-10 md:mb-20">
                                <button
                                    className="flex justify-center w-full px-4 py-3 text-center text-white bg-ind md:w-3/4 rounded-3xl"
                                    type={"submit"}
                                >
                                    <p className="flex px-2 py-1 text-sm uppercase md:text-base">
                                        {LANGUAGE.list.submit}
                                    </p>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
						<Footer />
        </div>
    );
};
