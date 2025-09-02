import { Navbar } from "../components/Navigation/Navbar";
import "leaflet/dist/leaflet.css";
import MapClient from "./MapClient";
import { auth } from '@/app/auth'
import { use } from 'react'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
 
export default async function Page(props: {
  searchParams: SearchParams
}) {    
    const session = await auth()
    const { tab, source, destination } = use(props.searchParams);
    
    // Convert tab to boolean (e.g., "true" or "false" string to boolean)
    const tabBool: boolean = tab === 'true';

    // Safely parse source and destination, fallback to default if not present or invalid
    let sourceObj = { lat: 0, lng: 0 };
    let destinationObj = { lat: 0, lng: 0 };
    try {
        if (typeof source === "string") sourceObj = JSON.parse(source);
    } catch {}
    try {
        if (typeof destination === "string") destinationObj = JSON.parse(destination);
    } catch {}

    return (
        <div>
            <Navbar logged={true} />
            <MapClient tabProp={tabBool} sourceProp={sourceObj} destinationProp={destinationObj} />
        </div>
    );
}