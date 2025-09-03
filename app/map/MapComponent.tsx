"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// @ts-ignore
import L from "leaflet"; 
import { InsertNote } from "../components/Data/InsertNote";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"


const sourceIcon = new L.Icon({
  iconUrl: "/LocationIcon.svg", // path relative to public folder
  iconSize: [40, 40], // adjust as needed
  iconAnchor: [20, 40], // adjust as needed
  popupAnchor: [0, -40], // adjust as needed
});
// Example custom icon for the source marker

const destinationIcon = new L.Icon({
    iconUrl: "Destination.svg",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
})

const GPS = new L.Icon({
    iconUrl: '/GPS.svg',
    iconSize: [20, 20],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
})


function SetViewOnLocation({ location }: { location: { lat: number; lng: number } | null }) {
  const map = useMap();
  useEffect( () => {
    if(location){
        map.setView([location.lat, location.lng])
    }
  }, [location, map])
  return null;
}

function MapClickHandler({onClick} : {onClick: (lat: number, lng: number) => void}){
    useMapEvent('click', (e: any) => {
        onClick(e.latlng.lat, e.latlng.lng)
    })
    return null
}



type MapComponentProps = {
  tabProp: boolean;
  sourceProp: { lat: number; lng: number };
  destinationProp: { lat: number; lng: number };
};

export default function MapComponent(props: MapComponentProps) {
  const { tabProp, sourceProp, destinationProp } = props;

  const [location, setLocation] = useState<{ lat: number; lng: number} | null>(null);
  const [source, setSource] = useState<{lat: number; lng: number} | null>(null);
  const [destination, setDestination] = useState<{lat: number; lng: number} | null>(null);
  const [status, setStatus] = useState(0);
  const [addnote, setAddnote] = useState(false);
  const [tab, setTab] = useState('Add');

  useEffect(() => {
    if (tabProp == true) {
      setTab("View");
    }
  }, [tabProp]);

  useEffect(() => {
    if (sourceProp) {
      setSource(sourceProp);
    }
  }, [sourceProp]);

  useEffect(() => {
    if (destinationProp) {
      setDestination(destinationProp);
    }
  }, [destinationProp]);
  useEffect(()=> {
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }, [])

  const handleMapClick = (lat: number, lng: number) => {
    if(status == 0){
        setSource({lat, lng})
        setStatus(1)
    }else if(status == 1){
        setDestination({lat, lng})
        setStatus(2)

    }else{
        setSource(null)
        setDestination(null)
        setStatus(0)
    }
  };

  return (
    
    <Tabs value={tab} onValueChange={setTab}>
    <TabsList>
        <TabsTrigger value="Add">Add Note</TabsTrigger>
        <TabsTrigger value="View">View Note</TabsTrigger>
    </TabsList>
    <TabsContent value="View">
    
    <div>


    <MapContainer 
      // @ts-ignore
      center={location ? [location.lat, location.lng] : [51.505, -0.09]} 
      zoom={13} 
      style={{ height: "400px", width: "100%" }}
      >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // @ts-ignore
        attribution="&copy; OpenStreetMap contributors"
        />
      <Marker position={location ? [location.lat, location.lng] : [51.505, -0.09]}
      //   @ts-ignore
      icon={GPS}
      >
        <Popup>Your current Location!</Popup>
      </Marker>


      {source && (
          // @ts-ignore
          <Marker position={[source.lat, source.lng]} icon={sourceIcon}>
          <Popup>Start</Popup>
        </Marker>
      )}
      {destination && (
          // @ts-ignore   
          <Marker position={[destination.lat, destination.lng]} icon={destinationIcon}>
          <Popup>Destination</Popup>
        </Marker>
      )}

      <SetViewOnLocation location={location}/>
      <MapClickHandler onClick={handleMapClick}/>
    </MapContainer>
    </div>
    </TabsContent>
    <TabsContent value="Add">
    <div>

    <div className="m-3">
    <div className="flex gap-2">
    <h1>Start location</h1>
    {(status == 1 || status == 2 )&& (<p>Set ✅</p>)}
    </div>

    <div className="flex gap-2">
        <h1>Destination</h1>
        {status == 2 && <p>Set ✅</p>}
    </div>
    
    {(status == 0 || status == 1 ) && (
        <Button>
        Not Set
        </Button>
    )}
    {(status == 2) && (
        <Button
        onClick={() => setAddnote(!addnote)}
        className="bg-blue-800">
        Menu
        </Button>
    )}
    {addnote === true && source && destination && (
        <InsertNote startProp={source} destinationProp={destination} />
    )}
    </div>
    <MapContainer 
      // @ts-ignore
      center={location ? [location.lat, location.lng] : [51.505, -0.09]} 
      zoom={13} 
      style={{ height: "400px", width: "100%" }}
      >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // @ts-ignore
        attribution="&copy; OpenStreetMap contributors"
        />
      <Marker position={location ? [location.lat, location.lng] : [51.505, -0.09]}
      //   @ts-ignore
      icon={GPS}
      >
        <Popup>Your current Location!</Popup>
      </Marker>

      {source && (
          // @ts-ignore
          <Marker position={[source.lat, source.lng]} icon={sourceIcon}>
          <Popup>Start</Popup>
        </Marker>
      )}
      {destination && (
          // @ts-ignore   
          <Marker position={[destination.lat, destination.lng]} icon={destinationIcon}>
          <Popup>Destination</Popup>
        </Marker>
      )}
      

      <SetViewOnLocation location={location}/>
      <MapClickHandler onClick={handleMapClick}/>
    </MapContainer>
    </div>
    </TabsContent>
    </Tabs>

  );
}