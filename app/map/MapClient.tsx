"use client";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

type MapClientProps = {
  tabProp: boolean;
  sourceProp: { lat: number; lng: number };
  destinationProp: { lat: number; lng: number };
};

export default function MapClient(props: MapClientProps) {
  return <MapComponent {...props} />;
}