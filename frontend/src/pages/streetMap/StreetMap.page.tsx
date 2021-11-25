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
  const animateRef = useRef(false);

  return (
    <MapContainer
      className="z-0"
      style={{ height: "100vh" }}
      center={LATLONG.yaounde}
      zoom={7}
      zoomControl={false}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
      />
      <CircleMarker
        center={LATLONG.maroua}
        pathOptions={{ color: "red" }}
        radius={2}
      >
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <CircleMarker
        center={LATLONG.garoua}
        pathOptions={{ color: "red" }}
        radius={2}
      >
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <CircleMarker
        center={LATLONG.nagoundere}
        pathOptions={{ color: "red" }}
        radius={2}
      >
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <CircleMarker
        center={LATLONG.yaounde}
        pathOptions={{ color: "red" }}
        radius={2}
      >
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <CircleMarker
        center={LATLONG.douala}
        pathOptions={{ color: "red" }}
        radius={2}
      >
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <CircleMarker
        center={LATLONG.bafoussan}
        pathOptions={{ color: "red" }}
        radius={2}
      >
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <CircleMarker
        center={LATLONG.bamenda}
        pathOptions={{ color: "red" }}
        radius={2}
      >
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <CircleMarker
        center={LATLONG.buea}
        pathOptions={{ color: "red" }}
        radius={2}
      >
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <CircleMarker
        center={LATLONG.ebolowa}
        pathOptions={{ color: "red" }}
        radius={2}
      >
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <CircleMarker
        center={LATLONG.bertoua}
        pathOptions={{ color: "red" }}
        radius={2}
      >
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <LocationMarker />
      <ZoomControl position="topright" zoomInText="🧐" zoomOutText="🗺️" />
      <SetViewOnClick animateRef={animateRef} />
    </MapContainer>
  );
};
