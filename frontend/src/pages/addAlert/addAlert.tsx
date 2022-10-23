import React, {useEffect, useState} from "react";
import "./addAlert.css";
import {MyDrawer} from "../../components/drawer/Drawer.component";
import {Link} from "react-router-dom";
import accueil from "../../assets/img/accueil.png";
import {LANGUAGE} from "../../constants/language";
import {useRecoilValue} from "recoil";
import {MyText} from "../../components/myText/MyText.component";
import {Footer} from "../../components/footer/Footer.component";
import {useTranslation} from "react-i18next";
import AlertService from "../../services/api/AlertService";
import CityService from "../../services/api/CityService";

export const AddAlert = () => {
    const {t} = useTranslation();
    const details: any = useRecoilValue(AlertService.getDetails);
    const theDetails = details.data;
    const [theDetailsState, setTheDetailsState] = useState([]);
    const regions: any = useRecoilValue(CityService.getRegions);
    const theRegions = regions.data;
    const [userChoice, setUserChoice] = useState(" ");
    const [stateOptions, setStateValues] = useState([]);
    useEffect(() => {
        localStorage.setItem("myRegionName", userChoice);
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
                    <div className="flex items-center justify-between site__lists-header">
                        <MyDrawer justify="start"/>
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
                    {/*<form method={"post"}>*/}
                    <div className="mt-4">
                        <div className="flex flex-col items-center justify-around my-5 md:my-10">
                            <MyText
                                variant="title"
                                myText={t(LANGUAGE.home.signalerPanne)}
                                myTextColor="text-ind"
                                textUppercase="uppercase"
                            />
                            <p className="text-sm text-white text-gray-200 md:text-base">
                                {t(LANGUAGE.home.signalerDescription)}
                            </p>
                        </div>
                        <div>
                            <div className="flex flex-col items-center justify-around mt-6 panne md:mt-12">
                                <p className="w-full text-sm font-normal text-left text-gray-200 md:text-lg md:w-3/4">
                                    {t('report_field_type')}
                                </p>

                                <select
                                    className="w-full mt-2 mb-4 border border-grayC rounded-md md:mb-10 md:w-3/4"
                                    style={{height: "61px"}}
                                    name=""
                                    id="panne"
                                >
                                    <option
                                        value="0"
                                        disabled
                                        selected
                                        hidden
                                    >
                                        {t("global_label_select_placeholder")}
                                    </option>
                                    <option value="">Water</option>
                                    <option value="2">Internet</option>
                                    <option value="3">Electricity</option>
                                </select>
                            </div>

                            <div className="flex flex-col items-center justify-around">
                                <p className="w-full text-sm font-normal text-left text-gray-200 md:text-lg md:w-3/4">
                                    {t('report_field_region')}
                                </p>
                                <select
                                    className="w-full mt-2 mb-4 border border-grayC rounded-md md:mb-16 md:w-3/4"
                                    style={{height: "61px"}}
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
                                        {t("global_label_select_placeholder")}
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
                                    {t('report_field_neighborhood')}
                                </p>
                                <select
                                    className="w-full mt-2 mb-4 border border-grayC rounded-md md:mb-16 md:w-3/4"
                                    style={{height: "61px"}}
                                    name=""
                                    id="quartier"
                                >
                                    <option
                                        value="0"
                                        disabled
                                        selected
                                        hidden
                                    >
                                        {t("global_label_select_placeholder")}
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
                                    {t('report_field_description')}
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
                                // type={"submit"}
                                onClick={() => {
                                    console.log("Submit this form is not yep available")
                                }}
                            >
                                <p className="flex px-2 py-1 text-sm uppercase md:text-base">
                                    {t('report_btn_submit')}
                                </p>
                            </button>
                        </div>
                    </div>
                    {/*</form>*/}
                </div>
            </div>
            <Footer/>
        </div>
    );
};


export default AddAlert
