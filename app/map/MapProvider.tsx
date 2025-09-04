"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import L from "leaflet";
import Map, { sourceIcon, destinationIcon, gpsIcon } from "./Map";
import { InsertNote } from "../components/Data/InsertNote";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const MapProvider = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State for user's location and map center
  const [userLocation, setUserLocation] = useState<L.LatLng | null>(null);
  const [mapCenter, setMapCenter] = useState<L.LatLng>(new L.LatLng(51.505, -0.09));

  // State for note creation
  const [source, setSource] = useState<L.LatLng | null>(null);
  const [destination, setDestination] = useState<L.LatLng | null>(null);
  const [selecting, setSelecting] = useState<"source" | "destination" | null>("source");
  const [showInsertNote, setShowInsertNote] = useState(false);

  // Active tab from URL
  const activeTab = searchParams.get("tab") || "add";

  // Get user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = new L.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        setUserLocation(newLocation);
        setMapCenter(newLocation);
      },
      () => {
        console.error("Could not get user location.");
      }
    );
  }, []);

  // Parse source and destination from URL for "view" tab
  const viewMarkers = useMemo(() => {
    const markers: { position: L.LatLngExpression; icon: L.Icon; popup?: string }[] = [];
    if (activeTab === "view") {
      const sourceStr = searchParams.get("source");
      const destStr = searchParams.get("destination");
      if (sourceStr) {
        try {
          const sourceCoords = JSON.parse(sourceStr);
          markers.push({
            position: new L.LatLng(sourceCoords.lat, sourceCoords.lng),
            icon: sourceIcon,
            popup: "Start",
          });
        } catch (e) {
          console.error("Invalid source format in URL");
        }
      }
      if (destStr) {
        try {
          const destCoords = JSON.parse(destStr);
          markers.push({
            position: new L.LatLng(destCoords.lat, destCoords.lng),
            icon: destinationIcon,
            popup: "Destination",
          });
        } catch (e) {
          console.error("Invalid destination format in URL");
        }
      }
    }
    if (userLocation) {
      markers.push({
        position: userLocation,
        icon: gpsIcon,
        popup: "Your Location",
      });
    }
    return markers;
  }, [activeTab, searchParams, userLocation]);

  // Markers for "add" tab
  const addMarkers = useMemo(() => {
    const markers: { position: L.LatLngExpression; icon: L.Icon; popup?: string }[] = [];
    if (userLocation) {
      markers.push({
        position: userLocation,
        icon: gpsIcon,
        popup: "Your Location",
      });
    }
    if (source) {
      markers.push({ position: source, icon: sourceIcon, popup: "Start" });
    }
    if (destination) {
      markers.push({
        position: destination,
        icon: destinationIcon,
        popup: "Destination",
      });
    }
    return markers;
  }, [userLocation, source, destination]);

  // Handle map click for adding notes
  const handleMapClick = (e: L.LeafletMouseEvent) => {
    if (activeTab !== "add") return;

    if (selecting === "source") {
      setSource(e.latlng);
      setSelecting("destination");
    } else if (selecting === "destination") {
      setDestination(e.latlng);
      setSelecting(null); // Done selecting
    }
  };

  // Handle tab change
  const onTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetSelection = () => {
    setSource(null);
    setDestination(null);
    setSelecting("source");
    setShowInsertNote(false);
  };

  return (
    <div className="p-4">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList>
          <TabsTrigger value="add">Add Note</TabsTrigger>
          <TabsTrigger value="view">View Note</TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <p>1. Select start location: {source ? `✅ Set` : "❌ Not Set"}</p>
              <p>2. Select destination: {destination ? `✅ Set` : "❌ Not Set"}</p>
            </div>
            {source && destination && !showInsertNote && (
              <Button onClick={() => setShowInsertNote(true)}>Add Note Details</Button>
            )}
            <Button onClick={resetSelection} variant="outline">Reset Selection</Button>
            {showInsertNote && source && destination && (
              <InsertNote startProp={source} destinationProp={destination} />
            )}
            <Map
              center={mapCenter}
              markers={addMarkers}
              onClick={handleMapClick}
            />
          </div>
        </TabsContent>
        <TabsContent value="view">
          <Map center={mapCenter} markers={viewMarkers} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MapProvider;
