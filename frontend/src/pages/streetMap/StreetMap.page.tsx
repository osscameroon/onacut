import React, { useRef } from "react";
import L from "leaflet";
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
import { LocationMarker } from "../../scripts/check_position";
import { LIST_VILLE } from "../../scripts/list_ville";
import { LIST_QUARTIER } from "../../scripts/list_quartier";
import { useRecoilState, useRecoilValue } from "recoil";
import { zoomLevelState } from "../../atoms/zoom_level";

function ZoomComponent() {
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
  shadowUrl: bolt,
  iconSize: [0, 0],
  shadowSize: [30, 30],
  shadowAnchor: [10, 45],
});

export const StreetMap = () => {
  const yaounde: any = LIST_VILLE[9].longlat;
  const animateRef = useRef(false);
  const v = useRecoilValue(zoomLevelState);
  if (v > 9) {
    return (
      <MapContainer
        className="z-0"
        style={{ height: "100vh" }}
        center={yaounde}
        zoom={v}
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <ZoomComponent />
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
        {LIST_QUARTIER.map((item: any, index: any) => (
          <Marker position={item.longlat} icon={lightBolt} key={index}>
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
                {item.name}
              </span>
            </Tooltip>
          </Marker>
        ))}
        <LocationMarker />
        <ZoomControl position="bottomright" />

        <SetViewOnClick animateRef={animateRef} />
      </MapContainer>
    );
  } else {
    return (
      <MapContainer
        className="z-0"
        style={{ height: "100vh" }}
        center={yaounde}
        zoom={v}
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <ZoomComponent />
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
        {LIST_VILLE.map((item: any, index: any) => (
          <Marker position={item.longlat} icon={lightBolt} key={index}>
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
                {item.name}
              </span>
            </Tooltip>
          </Marker>
        ))}
        <LocationMarker />
        <ZoomControl position="bottomright" />

        <SetViewOnClick animateRef={animateRef} />
      </MapContainer>
    );
  }
};
