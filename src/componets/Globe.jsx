import React, { useRef, useEffect, useState } from "react";
import createGlobe from "cobe";
import { format } from "date-fns";

const fetchLocationName = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
    );
    const data = await response.json();
    return data.address
      ? `${data.address.city || data.address.town || data.address.village || 'Unknown Location'}`
      : 'Unknown Location';
  } catch (error) {
    console.error("Error fetching location name:", error);
    return 'Error fetching location name';
  }
};

const Globe = () => {
  const canvasRef = useRef(null);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [locationName, setLocationName] = useState("Fetching location...");
  const [currentDate, setCurrentDate] = useState(format(new Date(), 'MMMM dd, yyyy'));

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          const name = await fetchLocationName(latitude, longitude);
          setLocationName(name);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setLocationName('Unable to fetch location');
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocationName('Geolocation not supported');
    }
  }, []);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: userLocation.lat && userLocation.lng ? [
        { location: [userLocation.lat, userLocation.lng], size: 0.05, name: "Your Location" },
      ] : [],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, [userLocation]);

  useEffect(() => {
    const updateDate = () => {
      setCurrentDate(format(new Date(), 'MMMM dd, yyyy'));
    };

    updateDate();
    const intervalId = setInterval(updateDate, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      />
      <div className="absolute top-4 left-4 p-4 text-black dark:text-white rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold">Current Location</h2>
        <p className="text-sm">{locationName}</p>
      </div>
      <div className="absolute top-4 right-4 p-4 text-black dark:text-white rounded-lg shadow-lg">
        <p className="text-sm">{currentDate}</p>
      </div>
    </div>

  );
};

export default Globe;
