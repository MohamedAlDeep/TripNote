// "use client";
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Icons need to be initialized only on the client side
// const sourceIcon = new L.Icon({
//   iconUrl: "/LocationIcon.svg",
//   iconSize: [40, 40],
//   iconAnchor: [20, 40],
//   popupAnchor: [0, -40],
// });

// const destinationIcon = new L.Icon({
//   iconUrl: "/Destination.svg",
//   iconSize: [40, 40],
//   iconAnchor: [20, 40],
//   popupAnchor: [0, -40]
// });

// const GPS = new L.Icon({
//   iconUrl: '/GPS.svg',
//   iconSize: [20, 20],
//   iconAnchor: [20, 40],
//   popupAnchor: [0, -40]
// });

// // Helper components
// function SetViewOnLocation({ location }) {
//   const map = useMap();
  
//   if (location) {
//     map.setView([location.lat, location.lng], map.getZoom());
//   }
  
//   return null;
// }

// function MapClickHandler({ onClick }) {
//   useMapEvent('click', (e) => {
//     onClick(e.latlng.lat, e.latlng.lng);
//   });
  
//   return null;
// }

// // Main map component
// export default function LeafletComponents({ 
//   location, 
//   source, 
//   destination, 
//   onMapClick 
// }) {
//   const defaultCenter = [51.505, -0.09];
//   const mapCenter = location ? [location.lat, location.lng] : defaultCenter;

//   return (
//     <MapContainer
//       center={mapCenter}
//       zoom={13}
//       style={{ height: "400px", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="&copy; OpenStreetMap contributors"
//       />
      
//       {location && (
//         <Marker position={[location.lat, location.lng]} icon={GPS}>
//           <Popup>Your current Location!</Popup>
//         </Marker>
//       )}

//       {source && (
//         <Marker position={[source.lat, source.lng]} icon={sourceIcon}>
//           <Popup>Start</Popup>
//         </Marker>
//       )}
      
//       {destination && (
//         <Marker position={[destination.lat, destination.lng]} icon={destinationIcon}>
//           <Popup>Destination</Popup>
//         </Marker>
//       )}

//       <SetViewOnLocation location={location} />
//       <MapClickHandler onClick={onMapClick} />
//     </MapContainer>
//   );
// }
