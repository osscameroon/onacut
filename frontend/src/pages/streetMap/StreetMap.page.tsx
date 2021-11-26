import L from "leaflet";
import React, { useRef } from "react";
import bolt from "../../assets/img/energy.png";

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

  iconSize: [0, 0], // size of the icon
  shadowSize: [30, 30], // size of the shadow
  shadowAnchor: [10, 45], // the same for the shadow
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
        <Marker position={item.longlat} icon={lightBolt} key={index}>
          <Tooltip
            direction="right"
            offset={[20, -35]}
            // sticky={false}
            permanent
          >
            <span>{item.name}</span>
          </Tooltip>
        </Marker>
      ))}
      <LocationMarker />
      <ZoomControl position="topright" zoomInText="🧐" zoomOutText="🗺️" />
      <SetViewOnClick animateRef={animateRef} />
    </MapContainer>
  );
};
