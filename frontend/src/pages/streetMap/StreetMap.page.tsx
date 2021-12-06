import L from "leaflet";
import React, { useRef } from "react";
import bolt from "../../assets/img/electricity.png";
import "./StreetMap.css";

import {
  MapContainer,
  TileLayer,
  useMapEvent,
  ZoomControl,
  Tooltip,
  Marker,
} from "react-leaflet";
import { LocationMarker } from "../../scripts/check_position";
import { ALL_LIST } from "../../scripts/all_city";
import { LIST_VILLE } from "../../scripts/list_ville";

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

  return (
    <MapContainer
      className="z-0"
      style={{ height: "100vh" }}
      center={yaounde}
      zoom={13}
      zoomControl={false}
      scrollWheelZoom={true}
      minZoom={9}
      maxZoom={16}
    >
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
      />
      {ALL_LIST.map((item: any, index: any) => (
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
};
