import React, {useRef, useState} from "react";
import L from "leaflet";
import bolt from "../../assets/img/electricity.png";
import nrj from "../../assets/img/energy.png";
import "./StreetMap.css";
import {MapContainer, Marker, TileLayer, Tooltip, useMapEvent, useMapEvents, ZoomControl,} from "react-leaflet";
import {useRecoilState, useRecoilValue} from "recoil";
import {Modal} from "../../modals/Modals";
import {panneBtnState, zoomLevelState} from "../../atoms";
import AlertService from "../../services/api/AlertService";
import CityService from "../../services/api/CityService";
import {AlertType, CityType} from "../../types";
import AlertDetailModal from "./components/AlertDetailModal";

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

const nrjBolt = L.icon({
    iconUrl: nrj,
    shadowSize: [30, 30],
    iconAnchor: [10, 45],
    shadowAnchor: [10, 45],
    popupAnchor: [-0, -0],
    iconSize: [30, 30],
});

const alertIcon = L.icon({
    iconUrl: "/alert-triangle.svg",
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
    // Is myCities is empty, center the map on Yaoundé
    let centerOn: any = myCities.length > 0 ? [myCities[7]['longitude'], myCities[7]['lattitude']] : [3.854859686578735, 11.500525735864192];
    if (lat && long) {
        const lat_f = parseFloat(lat)
        const long_f = parseFloat(long)
        if (lat_f > 80 || long_f > 80) {
            alert("these coordinates are not exact !")
        } else {
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
        const quarterName = quarter['district_id'];
        if (qCount.has(quarterName)) {
            qCount.get(quarterName)['occurrence'] += 1;
        } else {
            qCount.set(quarterName, {...quarter, 'occurrence': 1});
        }
    });

    const newQuartier = [...qCount.values()];

    const [selectedAlert, setSelectedAlert] = useState<AlertType | undefined>(undefined);

    console.log(newQuartier);

    return (
        <>
            {
                !!selectedAlert &&
                <AlertDetailModal
                    open={!!selectedAlert}
                    alert={selectedAlert}
                    onClose={() => setSelectedAlert(undefined)}
                />
            }
            {
                v > 9 ? (
                    <MapContainer
                        className="z-0"
                        style={{height: "100vh"}}
                        center={centerOn}
                        zoom={v}
                        zoomControl={false}
                        scrollWheelZoom={true}
                    >
                        <MyComponent/>
                        <TileLayer
                            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                        />
                        {newQuartier.map((item: AlertType, index: any) => {
                                return (
                                    <Marker
                                        eventHandlers={{
                                            click: () => {
                                                setSelectedAlert(item);
                                            },
                                        }}
                                        position={[item.lattitude ?? 0.0, item.longitude ?? 0.0]}
                                        icon={item.type !== "electricity" ? lightBolt : nrjBolt}
                                        key={item?.id ?? `alert-${index}`}
                                    >

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
                                1
                            </span>
                                        </Tooltip>
                                    </Marker>
                                )
                            }
                        )}
                        <ZoomControl position="bottomright"/>
                    </MapContainer>
                ) : (
                    <MapContainer
                        className="z-0"
                        style={{height: "100vh"}}
                        center={centerOn}
                        zoom={v}
                        zoomControl={false}
                        scrollWheelZoom={true}
                    >
                        <MyComponent/>
                        <TileLayer
                            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>
                     &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                        />
                        {myCities.map((item: CityType, index: number) => (
                            <Marker
                                eventHandlers={{
                                    click: () => {
                                        setVille(() => (villi = item.name));
                                        setNumAlert(() => (numAlert = item.total_alerts));
                                        setPanneBtn(() => (panneBtn = 0));
                                        /* setListQuartier(
                                             () =>
                                                 (listQuartier =
                                                     item.alert_districts.length === 0
                                                         ? "Vide"
                                                         : item.alert_districts)
                                         );*/
                                        setShow(true);
                                    },
                                }}
                                position={[item?.lattitude ?? 0.0, item.longitude ?? 0.0]}
                                icon={alertIcon}
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
                                {item.total_alerts ?? 0}
                            </span>
                                </Tooltip>
                            </Marker>
                        ))}
                        <ZoomControl position="bottomright"/>
                    </MapContainer>
                )
            }
        </>
    )
};

export default StreetMap;
