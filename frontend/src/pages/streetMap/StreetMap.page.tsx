import React, { useRef } from "react";

import {
  MapContainer,
  TileLayer,
  useMapEvent,
  ZoomControl,
  CircleMarker,
  Tooltip,
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

export const StreetMap = () => {
  const yaounde: any = [3.826985, 11.495974];
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
      {LATLONG.map((item: any, index: any) => (
        <CircleMarker
          key={index}
          center={item.longlat}
          pathOptions={{ color: "red" }}
          radius={5}
        >
          <Tooltip>{item.name}</Tooltip>
        </CircleMarker>
      ))}
      <LocationMarker />
      <ZoomControl position="topright" zoomInText="🧐" zoomOutText="🗺️" />
      <SetViewOnClick animateRef={animateRef} />
    </MapContainer>
  );
};
