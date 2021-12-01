import L from "leaflet";
import React, { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import bolt from "../assets/img/energy.png";
export const lightBolt = L.icon({
  iconUrl: bolt,
  shadowUrl: bolt,
  iconSize: [0, 0],
  shadowSize: [0, 0],
  shadowAnchor: [10, 45],
});
export const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e: any) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker icon={lightBolt} position={position}></Marker>
  );
};
