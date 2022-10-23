import React, { useRef, useState, useEffect } from "react";
import L, { latLng } from "leaflet";
import bolt from "../../assets/img/electricity.png";
import "./StreetMap.css";
import {
    MapContainer,
    TileLayer,
    useMapEvent,
    ZoomControl,
    Tooltip,
    Marker,
    useMapEvents,
} from "react-leaflet";
import { useRecoilState, useRecoilValue } from "recoil";
import { Modal } from "../../modals/Modals";
import LanguageSelect from "../../languageSelect";
import {panneBtnState, zoomLevelState} from "../../atoms";
import AlertService from "../../services/api/AlertService";
import CityService from "../../services/api/CityService";

function MyComponent() {
    const [zoomLevel, setZoomLevel] = useRecoilState(zoomLevelState); // initial zoom level provided for MapContainer
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });
    return null;
}

const SetViewOnClick = (animateRef: any) => {
    const map = useMapEvent("click", (e) => {
        map.setView(e.latlng, map.getZoom(), {
            animate: animateRef.current || false,
        });
    });

    return null;
};

const lightBolt = L.icon({
    iconUrl: bolt,
    shadowSize: [30, 30],
    iconAnchor: [10, 45],
    shadowAnchor: [10, 45],
    popupAnchor: [-0, -0],
    iconSize: [30, 30],
});

const StreetMap = (props: any) => {
    const queryParams = new URLSearchParams(window.location.search)
    const myQuarters: any = useRecoilValue(AlertService.getDetails)?.data;
    const lat = queryParams.get("lat");
    const long = queryParams.get("long");
    const myCities: any = useRecoilValue(CityService.getCities)?.data;
    let centerOn: any = [myCities[7]['locations'][0]['longitude'], myCities[7]['locations'][0]['lattitude']];
    if (lat && long ){
        const lat_f = parseFloat(lat)
        const long_f = parseFloat(long)
        if (lat_f > 80 || long_f > 80){
            alert("these coordinates are not exact !")
        }else{
            centerOn = [lat_f, long_f]
        }
    }
    const animateRef = useRef(false);
    const v = useRecoilValue(zoomLevelState);
    const [show, setShow] = useState(false);
    let [panneBtn, setPanneBtn] = useRecoilState(panneBtnState);
    let [villi, setVille]: any = useState("");
    let [numAlert, setNumAlert]: any = useState(0);
    let [listQuartier, setListQuartier]: any = useState([]);

    const qCount = new Map();
    myQuarters.forEach((quarter: any) => {
        const quarterName = quarter['district'];
        if (qCount.has(quarterName)) {
            qCount.get(quarterName)['occurrence'] += 1;
        } else {
            qCount.set(quarterName, {...quarter, 'occurrence': 1 });
        }
    });

    const newQuartier = [...qCount.values()];

    if (v > 9) {
        return (
            <MapContainer
                className="z-0"
                style={{ height: "100vh" }}
                center={centerOn}
                zoom={v}
                zoomControl={false}
                scrollWheelZoom={true}
            >
                   <LanguageSelect  />
                <MyComponent />
                <TileLayer
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                />
                {newQuartier.map((item: any, index: any) => (
                    <Marker
                        eventHandlers={{
                            click: () => {
                                setShow(true);
                            },
                        }}
                        position={[item.lattitude, item.longitude]}
                        icon={lightBolt}
                        key={index}
                    >
                        <Modal show={show} onClose={() => setShow(false)} />
                        <Tooltip
                            direction="right"
                            className="Tooltip"
                            offset={[2, -40]}
                            permanent
                            opacity={1}
                        >
                            <span
                                style={{
                                    fontSize: "8px",
                                    fontWeight: "bold",
                                    fontFamily: "sans-serif",
                                    padding: "5px",
                                }}
                                className="text-xs"
                            >
                                { item.occurrence }
                            </span>
                        </Tooltip>
                    </Marker>
                ))}
                <ZoomControl position="bottomright" />
            </MapContainer>
        );
    } else {
        return (
            <MapContainer
                className="z-0"
                style={{ height: "100vh" }}
                center={centerOn}
                zoom={v}
                zoomControl={false}
                scrollWheelZoom={true}
            >
                <MyComponent />
                <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>
                     &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                />
                {myCities.map((item: any, index: any) => (
                    <Marker
                        eventHandlers={{
                            click: () => {
                                setVille(() => (villi = item.name));
                                setNumAlert(() => (numAlert = item.num_alerts));
                                setPanneBtn(() => (panneBtn = 0));
                                setListQuartier(
                                    () =>
                                        (listQuartier =
                                            item.alert_districts.length === 0
                                                ? "Vide"
                                                : item.alert_districts)
                                );
                                setShow(true);
                            },
                        }}
                        position={[item.lattitude, item.longitude]}
                        icon={lightBolt}
                        key={index}
                    >
                        <Modal
                            ville={villi}
                            numberOfAlerts={numAlert}
                            quartiers={listQuartier}
                            onClose={() => {
                                setShow(false);
                                setPanneBtn(() => (panneBtn = 10));
                            }}
                            show={show}
                        />
                        <Tooltip
                            direction="right"
                            className="Tooltip"
                            offset={[2, -40]}
                            permanent
                            opacity={1}
                        >
                            <span
                                style={{
                                    fontSize: "8px",
                                    fontWeight: "bold",
                                    fontFamily: "sans-serif",
                                    padding: "5px",
                                }}
                                className="text-xs"
                            >
                                {item.num_alerts}
                            </span>
                        </Tooltip>
                    </Marker>
                ))}
                <ZoomControl position="bottomright" />
            </MapContainer>
        );
    }
};

export default StreetMap;
