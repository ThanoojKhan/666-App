import { useRef, useEffect, useState, useCallback } from "react";
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

  const resizeGlobe = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
    canvas.width = size * 2;
    canvas.height = size * 2;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: canvas.width,
      height: canvas.height,
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
        state.phi += 0.01;
      },
    });

    return globe;
  }, [userLocation]);

  useEffect(() => {
    const globe = resizeGlobe();

    const handleResize = () => {
      if (globe) globe.destroy();
      resizeGlobe();
    };

    const debouncedResize = debounce(handleResize, 200);
    window.addEventListener('resize', debouncedResize);

    return () => {
      if (globe) globe.destroy();
      window.removeEventListener('resize', debouncedResize);
    };
  }, [resizeGlobe]);

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
        style={{ width: '80vw', height: '80vw' }}
      />
      <div className="absolute top-4 left-4 p-4 text-black dark:text-white rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold">Your Location</h2>
        <p className="text-sm">{locationName}</p>
      </div>
      <div className="absolute top-4 right-4 p-4 text-black dark:text-white rounded-lg shadow-lg">
        <p className="text-sm">{currentDate}</p>
      </div>
    </div>
  );
};

export default Globe;

// Debounce function to limit the rate at which a function can fire.
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
