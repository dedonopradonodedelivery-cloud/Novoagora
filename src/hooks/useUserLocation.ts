import { useEffect, useState } from "react";

type Coords = {
  latitude: number;
  longitude: number;
};

type LocationData = {
  coords: Coords | null;
};

type UseUserLocationResult = {
  location: LocationData | null;
  isLoading: boolean;
  error: string | null;
};

export const useUserLocation = (): UseUserLocationResult => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setError("Geolocalização não é suportada neste dispositivo.");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
        setIsLoading(false);
      },
      (err) => {
        setError(err.message || "Não foi possível obter a localização.");
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5 * 60 * 1000,
      }
    );
  }, []);

  return { location, isLoading, error };
};
