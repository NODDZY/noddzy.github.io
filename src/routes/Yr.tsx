import { useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, useMapEvents } from "react-leaflet";
import { FiRefreshCw, FiMinusCircle } from "react-icons/fi";

import { fetchWeatherForecast, reverseGeocode } from "../services/yr/api";
import { Location, WeatherData } from "../services/yr/interface";
import WeatherTable from "../components/WeatherTable";

import "leaflet/dist/leaflet.css";
import "../styles/yr.css";

export default function Yr() {
  const [clickedLocation, setClickedLocation] = useState<Location | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forceRefresh, setForceRefresh] = useState(false);

  // Define URLs for map tiles based on color scheme
  const baseTileURLDark = "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";
  const baseTileURLLight = "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png";
  const [tileURL, setTileURL] = useState(window.matchMedia("(prefers-color-scheme: light)").matches ? baseTileURLLight : baseTileURLDark);

  // Effect to run when component mounts
  useEffect(() => {
    // Effect to set clickedLocation
    const storedLocation = localStorage.getItem("weather-location");
    const initialLocation: Location | null = storedLocation ? JSON.parse(storedLocation) : null;
    setClickedLocation(initialLocation)
    
    // Effect to update the tile URL when the system theme changes
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
  function MapClickHandler({ onClick }: { onClick: (e: any) => void }) {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        onClick({ lat, lng });
      }
    });
    return null;
  }

  function handleMinusButton() {
    setClickedLocation(null);
    localStorage.removeItem("weather-location");
    setWeatherData(null);
    setLocationName(null);
  }
  function handleRefreshButton() {
    setForceRefresh((prevForceRefresh) => !prevForceRefresh);
  }

  return (
    <div className="main-element">
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

      <div className="map-container">
        <MapContainer
          center={[62.6752, 8.5636]}
          zoom={3}
          id="map">
          <TileLayer
            noWrap={true}
            url={tileURL}
            attribution='<a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> | <a href="https://www.openstreetmap.org/copyright"  target="_blank">OpenStreetMap</a>'
          />
          <MapClickHandler
            onClick={(clickedLocation) => {
              setClickedLocation(clickedLocation);
              localStorage.setItem("weather-location", JSON.stringify(clickedLocation));
            }}
          />
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
