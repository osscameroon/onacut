import React from "react";
// import "./StreetMap.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export const StreetMap = () => {
  return (
    <MapContainer
      className="z-0"
      style={{ height: "100vh" }}
      center={[14.3210095, 10.5925289]}
      zoom={7}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[14.3210095, 10.5925289]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};
