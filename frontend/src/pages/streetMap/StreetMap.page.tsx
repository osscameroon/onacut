import React, { useCallback, useMemo, useRef, useState } from "react";
// import "./StreetMap.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  useMapEvents,
  Circle,
  ZoomControl,
} from "react-leaflet";

const center: any = [14.3210095, 10.5925289];

const fillBlueOptions = { fillColor: "blue" };

// Check position
function LocationMarker() {
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
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

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
      center={[14.3210095, 10.5925289]}
      zoom={7}
      zoomControl={true}
      scrollWheelZoom={true}
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
      <LocationMarker />
      <ZoomControl position="bottomright" zoomInText="🧐" zoomOutText="🗺️" />
      <SetViewOnClick animateRef={animateRef} />
      <Circle center={center} pathOptions={fillBlueOptions} radius={200} />
    </MapContainer>
  );
};
