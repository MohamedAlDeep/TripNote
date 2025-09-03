import { Navbar } from "../components/Navigation/Navbar";
import "leaflet/dist/leaflet.css";
import MapClient from "./MapClient";
import { auth } from '@/app/auth'

// Define the search params type as a Promise
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Page(props: {
  searchParams: SearchParams
}) {    
    const session = await auth()
    
    // Await the searchParams promise instead of using the 'use' hook
    const searchParamsResolved = await props.searchParams
    
    // Safely destructure search parameters
    const { tab, source, destination } = searchParamsResolved;
    
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