"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { useEffect, useState, useRef, useCallback, memo } from "react";
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

// Move icons outside component to prevent recreation on each render
const sourceIcon = new L.Icon({
  iconUrl: "/LocationIcon.svg",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const destinationIcon = new L.Icon({
    iconUrl: "Destination.svg",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

const GPS = new L.Icon({
    iconUrl: '/GPS.svg',
    iconSize: [20, 20],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

// Memoize child components to prevent unnecessary re-renders
const SetViewOnLocation = memo(({ location }: { location: { lat: number; lng: number } | null }) => {
  const map = useMap();
  useEffect(() => {
    if(location){
        map.setView([location.lat, location.lng])
    }
  }, [location, map]);
  return null;
});

const MapClickHandler = memo(({onClick}: {onClick: (lat: number, lng: number) => void}) => {
    useMapEvent('click', (e: any) => {
        onClick(e.latlng.lat, e.latlng.lng);
    });
    return null;
});

type MapComponentProps = {
  tabProp: boolean;
  sourceProp: { lat: number; lng: number };
  destinationProp: { lat: number; lng: number };
};

export default function MapComponent(props: MapComponentProps) {
  const { tabProp, sourceProp, destinationProp } = props;
  
  // Use refs to track previous prop values to prevent unnecessary state updates
  const prevTabProp = useRef(tabProp);
  const prevSourceProp = useRef(sourceProp);
  const prevDestProp = useRef(destinationProp);

  const [location, setLocation] = useState<{ lat: number; lng: number} | null>(null);
  const [source, setSource] = useState<{lat: number; lng: number} | null>(null);
  const [destination, setDestination] = useState<{lat: number; lng: number} | null>(null);
  const [status, setStatus] = useState(0);
  const [addnote, setAddnote] = useState(false);
  const [tab, setTab] = useState(() => tabProp ? "View" : "Add"); // Initialize with function to avoid re-computation
  
  // Use callback for all event handlers to prevent recreation on each render
  const handleMapClick = useCallback((lat: number, lng: number) => {
    if(status === 0){
        setSource({lat, lng});
        setStatus(1);
    }else if(status === 1){
        setDestination({lat, lng});
        setStatus(2);
    }else{
        setSource(null);
        setDestination(null);
        setStatus(0);
    }
  }, [status]);
  
  const handleMenuClick = useCallback(() => {
    setAddnote(prev => !prev); // Use functional update to avoid dependency on current state
  }, []);

  // Get user's location once on component mount
  useEffect(() => {
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []); // Empty dependency array to run only once
  
  // Handle prop changes using refs to compare with previous values
  useEffect(() => {
    // Only update if prop value changed
    if (tabProp !== prevTabProp.current) {
      if (tabProp === true) {
        setTab("View");
      }
      prevTabProp.current = tabProp;
    }
    
    // Only update if meaningful change in source prop
    if (sourceProp && (sourceProp.lat !== prevSourceProp.current.lat || 
                        sourceProp.lng !== prevSourceProp.current.lng)) {
      setSource(sourceProp);
      prevSourceProp.current = sourceProp;
    }
    
    // Only update if meaningful change in destination prop
    if (destinationProp && (destinationProp.lat !== prevDestProp.current.lat || 
                             destinationProp.lng !== prevDestProp.current.lng)) {
      setDestination(destinationProp);
      prevDestProp.current = destinationProp;
    }
  }, [tabProp, sourceProp, destinationProp]); // This effect only depends on props, not state

  // Prepare map center coordinates
  const mapCenter = location ? [location.lat, location.lng] : [51.505, -0.09];
  
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
            center={mapCenter} 
            zoom={13} 
            style={{ height: "400px", width: "100%" }}
            key="view-map" // Add key to differentiate from the other map
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              // @ts-ignore
              attribution="&copy; OpenStreetMap contributors"
            />
            
            {location && (
              // @ts-ignore
              <Marker position={[location.lat, location.lng]} icon={GPS}>
                <Popup>Your current Location!</Popup>
              </Marker>
            )}

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
              {(status === 1 || status === 2) && (<p>Set ✅</p>)}
            </div>

            <div className="flex gap-2">
              <h1>Destination</h1>
              {status === 2 && <p>Set ✅</p>}
            </div>
            
            {(status === 0 || status === 1) && (
              <Button>Not Set</Button>
            )}
            
            {status === 2 && (
              <Button
                onClick={handleMenuClick} // Use memoized handler
                className="bg-blue-800">
                Menu
              </Button>
            )}
            
            {addnote && source && destination && (
              <InsertNote startProp={source} destinationProp={destination} />
            )}
          </div>
          
          <MapContainer 
            // @ts-ignore
            center={mapCenter} 
            zoom={13} 
            style={{ height: "400px", width: "100%" }}
            key="add-map" // Add key to differentiate from the other map
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              // @ts-ignore
              attribution="&copy; OpenStreetMap contributors"
            />
            
            {location && (
              // @ts-ignore
              <Marker position={[location.lat, location.lng]} icon={GPS}>
                <Popup>Your current Location!</Popup>
              </Marker>
            )}

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