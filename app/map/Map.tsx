"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Define custom icons
export const sourceIcon = new L.Icon({
  iconUrl: "/LocationIcon.svg",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export const destinationIcon = new L.Icon({
  iconUrl: "/Destination.svg",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export const gpsIcon = new L.Icon({
  iconUrl: "/GPS.svg",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Map interaction components
const ChangeView = ({ center, zoom }: { center: L.LatLngExpression; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const MapClickHandler = ({ onClick }: { onClick: (e: L.LeafletMouseEvent) => void }) => {
  useMapEvent("click", onClick);
  return null;
};

// Main Map component props
interface MapProps {
  center: L.LatLngExpression;
  markers: { position: L.LatLngExpression; icon: L.Icon; popup?: string }[];
  onClick?: (e: L.LeafletMouseEvent) => void;
  zoom?: number;
}

const Map = ({ center, markers, onClick, zoom = 13 }: MapProps) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ChangeView center={center} zoom={zoom} />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} icon={marker.icon}>
          {marker.popup && <Popup>{marker.popup}</Popup>}
        </Marker>
      ))}
      {onClick && <MapClickHandler onClick={onClick} />}
    </MapContainer>
  );
};

export default Map;
