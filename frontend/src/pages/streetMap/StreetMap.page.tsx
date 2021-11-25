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

const position: any = [7.3696495, 12.3445856];

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
  const greenOptions = { color: "green", fillColor: "green" };

  return (
    <MapContainer
      className="z-0"
      style={{ height: "100vh" }}
      center={position}
      zoom={8}
      zoomControl={false}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
      />
      <CircleMarker
        center={[45.51, -0.12]}
        pathOptions={{ color: "red" }}
        radius={2}
      >
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <CircleMarker
        center={[51.51, -0.12]}
        pathOptions={{ color: "red" }}
        radius={2}
      >
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <Marker position={position}>
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
