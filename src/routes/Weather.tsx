import { useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, useMapEvents } from "react-leaflet";
import { FiRefreshCw, FiMinusCircle } from "react-icons/fi";

import { fetchWeatherForecast, reverseGeocode } from "../services/weather/api";
import { Location, WeatherData } from "../services/weather/interface";
import WeatherTable from "../components/WeatherTable";

import "leaflet/dist/leaflet.css";
import "../styles/routes/weather-forecast.css";

export default function Weather() {
  const [clickedLocation, setClickedLocation] = useState<Location | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forceRefresh, setForceRefresh] = useState(false);

  // Define URLs for map tiles based on color scheme
  const baseTileURLDark = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
  const baseTileURLLight = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
  const [tileURL, setTileURL] = useState(window.matchMedia("(prefers-color-scheme: light)").matches ? baseTileURLLight : baseTileURLDark);

  // Effect to run once when component mounts
  useEffect(() => {
    // Set initial clickedLocation
    const storedLocation = localStorage.getItem("weather-location");
    const initialLocation: Location | null = storedLocation ? JSON.parse(storedLocation) : null;
    setClickedLocation(initialLocation);

    // Update the tile URL when the system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const updateTileURL = () => {
      setTileURL(mediaQuery.matches ? baseTileURLLight : baseTileURLDark);
    };

    mediaQuery.addEventListener("change", updateTileURL);
    return () => {
      mediaQuery.removeEventListener("change", updateTileURL);
    };
  }, []);

  // Effect to fetch weather data when a location is clicked
  useEffect(() => {
    const fetchData = async () => {
      if (clickedLocation !== null) {
        try {
          const data = await fetchWeatherForecast(clickedLocation.lat, clickedLocation.lng);
          const locationNameData = await reverseGeocode(clickedLocation.lat, clickedLocation.lng);
          setWeatherData(data.properties);
          setLocationName(locationNameData.display_name);
        } catch (error) {
          console.error("Error fetching weather or location data:", error);
        }
      }
    };

    fetchData();
  }, [clickedLocation, forceRefresh]);

  // Event handler component for map clicks
  function MapClickHandler() {
    useMapEvents({
      click: (e) => {
        const clickedLocation = {
          lat: e.latlng.lat,
          lng: e.latlng.lng
        } as Location;
        setClickedLocation(clickedLocation);
        localStorage.setItem("weather-location", JSON.stringify(clickedLocation));
      }
    });
    return null;
  }

  // Function to remove current location
  function handleMinusButton() {
    setClickedLocation(null);
    localStorage.removeItem("weather-location");
    setWeatherData(null);
    setLocationName(null);
  }

  // Function to refresh forecast for current location
  function handleRefreshButton() {
    setForceRefresh((prevForceRefresh) => !prevForceRefresh);
  }

  return (
    <div className="main-element">
      <div className="yr-topbar">
        <div className="yr-header">
          <h1>Weather Forecast</h1>
          <div>
            <FiRefreshCw
              className="yr-refresh"
              onClick={handleRefreshButton}
            />
            <FiMinusCircle
              className="yr-refresh"
              onClick={handleMinusButton}
            />
          </div>
        </div>
        <p>Click on a location on the map to see the weather forecast.</p>
      </div>

      <div className="map-container">
        <MapContainer
          center={[62.6752, 8.5636]}
          zoom={3}
          id="map">
          <TileLayer
            noWrap={true}
            url={tileURL}
            attribution='<a href="https://www.openstreetmap.org/copyright"  target="_blank">OpenStreetMap</a>'
          />

          <MapClickHandler />

          {clickedLocation && (
            <CircleMarker
              center={[clickedLocation.lat, clickedLocation.lng]}
              radius={7}
              weight={1}
            />
          )}
        </MapContainer>
      </div>

      {locationName !== null && weatherData !== null ? (
        <WeatherTable
          weatherData={weatherData}
          locationName={locationName}
        />
      ) : null}
    </div>
  );
}
