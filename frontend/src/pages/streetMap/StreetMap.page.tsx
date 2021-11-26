import L from "leaflet";
import React, { useRef } from "react";
import bolt from "../../assets/img/lighting.png";

import {
  MapContainer,
  TileLayer,
  useMapEvent,
  ZoomControl,
  CircleMarker,
  Tooltip,
  Marker,
} from "react-leaflet";
import { LocationMarker } from "../../scripts/check_position";
import { LATLONG } from "../../scripts/lat_long";

const SetViewOnClick = (animateRef: any) => {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });

  return null;
};

var lightBolt = L.icon({
  iconUrl: bolt,
  shadowUrl: bolt,

  iconSize: [10, 10], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  shadowAnchor: [10, 72], // the same for the shadow
});

export const StreetMap = () => {
  const yaounde: any = [3.826985, 11.495974];
  const animateRef = useRef(false);

  return (
    <MapContainer
      className="z-0"
      style={{ height: "100vh" }}
      center={yaounde}
      zoom={8}
      zoomControl={false}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
      />
      {LATLONG.map((item: any, index: any) => (
        <CircleMarker key={index} center={item.longlat}>
          <Marker position={item.longlat} icon={lightBolt}>
            <Tooltip direction="right" offset={[30, -60]} opacity={1} permanent>
              <span>{item.name}</span>
            </Tooltip>
          </Marker>
        </CircleMarker>
      ))}
      <LocationMarker />
      <ZoomControl position="topright" zoomInText="🧐" zoomOutText="🗺️" />
      <SetViewOnClick animateRef={animateRef} />
    </MapContainer>
  );
};
