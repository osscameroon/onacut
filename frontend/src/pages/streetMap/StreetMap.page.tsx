import React, { useRef } from "react";

import {
  MapContainer,
  TileLayer,
  useMapEvent,
  ZoomControl,
  CircleMarker,
  Tooltip,
  Marker,
  Popup,
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
          <Marker position={item.longlat}>
            <Tooltip direction="right" offset={[-8, -2]} opacity={1} permanent>
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
