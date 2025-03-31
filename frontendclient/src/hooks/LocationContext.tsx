"use client";

import {
  useEffect,
  createContext,
  PropsWithChildren,
  useState,
  useContext,
} from "react";

type LocationContextType = { location: { lat: number; lng: number } | null };

const LocationContext = createContext<LocationContextType>(
  {} as LocationContextType
);

export const LocationProvider = ({ children }: PropsWithChildren) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLocation = localStorage.getItem("savedLocation");
      console.log("storedLocation", storedLocation);

      
      if (storedLocation) {
        try {
          const parsedLocation = JSON.parse(storedLocation);
          console.log("parsedLocation", parsedLocation);

      
          if (parsedLocation && typeof parsedLocation.lat === "number" && typeof parsedLocation.lng === "number") {
            setLocation(parsedLocation);
          } else {
            console.error("Invalid location format in localStorage:", parsedLocation);
          }
        } catch (error) {
          console.error("Error parsing location from localStorage:", error);
        }
      }
    }
  }, []);

  return (
    <LocationContext.Provider value={{ location }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
