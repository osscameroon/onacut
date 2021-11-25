import React, { useRef } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  ZoomControl,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import { LocationMarker } from "../../scripts/check_position";

const bamenda: any = [5.914395, 10.129316];
const bafoussan: any = [5.468774, 10.420834];
const bertoua: any = [4.558081, 13.662206];
const buea: any = [4.155587, 9.232463];
const douala: any = [4.03222, 9.706715];
const ebolowa: any = [2.891746, 11.15648];
const garoua: any = [9.278875, 13.394429];
const maroua: any = [10.588261, 14.350791];
const nagoundere: any = [7.349664, 13.577051];
const yaounde: any = [3.826985, 11.495974];

const SetViewOnClick = (animateRef: any) => {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });

  return null;
};

export const StreetMap = () => {
  const animateRef = useRef(false);

  return (
    <MapContainer
      className="z-0"
      style={{ height: "100vh" }}
      center={yaounde}
      zoom={7}
      zoomControl={false}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
      />
      <CircleMarker center={maroua} pathOptions={{ color: "red" }} radius={2}>
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <CircleMarker center={garoua} pathOptions={{ color: "red" }} radius={2}>
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <CircleMarker
        center={nagoundere}
        pathOptions={{ color: "red" }}
        radius={2}
      >
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <CircleMarker center={yaounde} pathOptions={{ color: "red" }} radius={2}>
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <CircleMarker center={douala} pathOptions={{ color: "red" }} radius={2}>
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <CircleMarker
        center={bafoussan}
        pathOptions={{ color: "red" }}
        radius={2}
      >
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <CircleMarker center={bamenda} pathOptions={{ color: "red" }} radius={2}>
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <CircleMarker center={buea} pathOptions={{ color: "red" }} radius={2}>
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <CircleMarker center={ebolowa} pathOptions={{ color: "red" }} radius={2}>
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <CircleMarker center={bertoua} pathOptions={{ color: "red" }} radius={2}>
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <Marker position={yaounde}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <LocationMarker />
      <ZoomControl position="topright" zoomInText="🧐" zoomOutText="🗺️" />
      <SetViewOnClick animateRef={animateRef} />
    </MapContainer>
  );
};
