import { useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/yr.css";

interface Location {
  latitude: number;
  longitude: number;
}

export default function Yr() {
  const [clickedLocation, setClickedLocation] = useState<Location | null>(null);

  const baseTileURLDark = "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";
  const baseTileURLLight = "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png";
  const [tileURL, setTileURL] = useState(
    window.matchMedia("(prefers-color-scheme: light)").matches ? baseTileURLLight : baseTileURLDark
  );

  useEffect(() => {
    // Function to update the tile URL when the system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const updateTileURL = () => {
      setTileURL(mediaQuery.matches ? baseTileURLLight : baseTileURLDark);
    };
    // Add an event listener to detect changes in the system theme
    mediaQuery.addEventListener("change", updateTileURL);
    return () => {
      mediaQuery.removeEventListener("change", updateTileURL);
    };
  }, []);

  function ClickHandler({ onClick }: { onClick: (e: any) => void }) {
    useMapEvents({
      click: onClick
    });
    return null;
  }
  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    setClickedLocation({ latitude: lat, longitude: lng });
  };

  return (
    <div className="main-element">
      <h1>Yr.no Weather Forecast</h1>
      <p>Click on a location on the map to see the weather forecast for the coming days.</p>
      <div className="map-container">
        <MapContainer
          center={[62.6752, 8.5636]}
          zoom={6}
          scrollWheelZoom={false}
          id="map">
          <TileLayer
            url={tileURL}
            attribution='<a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> | <a href="https://www.openstreetmap.org/copyright"  target="_blank">OpenStreetMap</a>'
          />
          <ClickHandler onClick={handleMapClick} />
          {clickedLocation && (
            <CircleMarker
              center={[clickedLocation.latitude, clickedLocation.longitude]}
              radius={5}
              weight={1}>
            </CircleMarker>
          )}
        </MapContainer>
      </div>
      {clickedLocation && (
        <div>
          <h2>Clicked Location:</h2>
          <p>Latitude: {clickedLocation.latitude}</p>
          <p>Longitude: {clickedLocation.longitude}</p>
        </div>
      )}
    </div>
  );
}
