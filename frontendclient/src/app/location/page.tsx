"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import the GoogleMap component, disabling SSR
const GoogleMap = dynamic(() => import("@react-google-maps/api").then((mod) => mod.GoogleMap), { ssr: false });
const LoadScript = dynamic(() => import("@react-google-maps/api").then((mod) => mod.LoadScript), { ssr: false });
const Marker = dynamic(() => import("@react-google-maps/api").then((mod) => mod.Marker), { ssr: false });

const containerStyle = {
  width: "400px",
  height: "400px",
};

function MyMap() {
  const [location, setLocation] = useState(null);

  const handleMapClick = (e) => {
    setLocation(e.latLng);
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 40.748817, lng: -73.985428 }}
        zoom={15}
        onClick={handleMapClick}
      >
        {location && <Marker position={location} />}
      </GoogleMap>
    </LoadScript>
  );
}

export default MyMap;
