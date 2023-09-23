import axios from "axios";

export async function fetchWeatherForecast(lat: number, lng: number) {
  // Using MET Weather API
  // See: https://developer.yr.no/
  const MET_URL = `https://api.met.no/weatherapi/locationforecast/2.0/compact`;

  try {
    console.log(`Fetching forecast [${lat.toFixed(2)},${lng.toFixed(2)}]`);
    const response = await axios.get(MET_URL, {
      params: {
        // From docs: When using requests with latitude/longitude, truncate all coordinates to max 4 decimals.
        lat: lat.toFixed(2),
        lon: lng.toFixed(2)
      }
    });

    const data = response.data;
    // Return GeoJSON object
    return data;
  } catch (error) {
    throw error;
  }
}

export async function reverseGeocode(lat: number, lng: number) {
  // Using OSM API to generate synthetic addresses of OSM points (reverse geocoding)
  // See: https://nominatim.org/release-docs/develop/
  const NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse";

  try {
    const response = await axios.get(NOMINATIM_URL, {
      params: {
        lat: lat.toFixed(2),
        lon: lng.toFixed(2),
        zoom: 12,
        format: "jsonv2"
      }
    });

    const data = response.data;
    console.log(`Reverse lookup [${data.display_name}]`);
    return data;
  } catch (error) {
    throw error;
  }
}
