import React from "react";
import './addAlert.css';
import {MyDrawer} from "../../components/drawer/Drawer.component";
import {Link} from "react-router-dom";
import accueil from "../../assets/img/accueil.png";
import {LANGUAGE} from "../../constants/language";
import {useRecoilValue} from "recoil";
import {getDetails} from "../../atoms/details";
import home from "../../assets/img/home.png"
import {getRegions} from "../../atoms/regions";


export const AddAlert = () => {
    const details: any = useRecoilValue(getDetails);
    const theDetails = details.data
    const regions: any = useRecoilValue(getRegions);
    const filterTheRegions = regions.data
    // @ts-ignore
    return (
        <div className="container mx-auto">
            <form method={'post'}>
                <div className="site__lists-header flex justify-between items-center">
                    <MyDrawer justify="start"/>
                    <u className={'text-white'}>
                        <p className={'text-white text-4xl mt-6'}>{LANGUAGE.home.signalerPanne}</p>
                    </u>
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
                <div className="body mt-10">
                    <div className="panne items-center flex justify-around">
                        <label htmlFor="panne" className={'relative text-white text-3xl'}>
                            Type de panne :
                        </label>
                        <select className={'w-96 h-12 text-center rounded-lg bg-[#0078ff]'}
                                name="" id="panne">
                            <option value="0" disabled selected hidden>Make a choice</option>
                            <option value="">Water</option>
                            <option value="2">Internet</option>
                            <option value="3">Electricity</option>
                        </select>
                    </div>
                    <div className="panne items-center flex justify-around mt-10">
                        <label htmlFor="panne" className={'relative text-white text-3xl'}>
                            Votre region :
                        </label>
                        <select className={'w-96 h-12 text-center rounded-lg bg-[#0078ff]'}>
                            <option value="0" disabled selected hidden>Make a choice</option>
                            {filterTheRegions.map((region: any) => {
                                return <option value={region.name} onClick={() => {
                                    localStorage.setItem(
                                        "myRegionName",
                                        region.name
                                    );
                                }}>
                                    {region.name}
                                </option>
                            })}
                        </select>
                    </div>
                    <br/>
                    <div className="quartier items-center flex justify-center mt-8">
                        <label htmlFor="quartier" className={'relative text-white text-3xl'}>
                            {LANGUAGE.list.city} :
                        </label>
                        <select className={'w-96 h-12 text-center rounded-lg bg-[#0078ff]'}
                                name="" id="quartier">
                            <option value="0" disabled selected hidden>Choose your quarter</option>
                            {theDetails.map((quatier: any) => {
                                return <option value={quatier.district_id}>
                                    {quatier?.district}
                                </option>
                            })}
                        </select>
                        <button type='button'
                                style={{
                                    fontFamily: " 'Varela Round', sans-serif",
                                }}
                                className="flex px-4 rounded px-3 py-3 ml-10 mt-2 bg-ind  py-1 text-gray-200"
                        >
                            <img
                                src={home}
                                alt=""
                                className="w-6 h-6 mr-2"
                            />
                            Position actuelle
                        </button>
                    </div>
                    <br/>
                    <div className="panne items-center flex justify-around mt-8">
                        <label htmlFor="pannel" className={'relative text-white text-3xl'}>
                            Decrivez votre panne :
                        </label>
                        <textarea className={'w-96 rounded-lg bg-[#0078ff]'}
                                  name="" id="panne" cols={30} rows={10}></textarea>
                    </div>
                </div>

                <div className="mt-10 py-2 bg-ind rounded-3xl flex items-center justify-center">
                    <button className="px-4 text-white" type={'submit'}>
                        <p className="flex uppercase px-2 py-1">
                            soumettre l'alerte
                        </p>
                    </button>
                </div>
            </form>
        </div>
    );
}
