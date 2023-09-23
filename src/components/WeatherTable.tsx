import { WeatherData } from "../services/yr/interface";
import { degreesToCompass, getDayAsString } from "../services/yr/utils";

interface WeatherTableProps {
  weatherData: WeatherData;
  locationName: string;
}

export default function WeatherTable({ weatherData, locationName }: WeatherTableProps) {
  const indicesToMap = [2, 5, 8, 11, 14, 17, 20, 23];
  const currentDay = new Date().getDay();

  return (
    <div className="weather-table">
      <div className="weather-text">
        <h2>{getDayAsString(currentDay)}</h2>
        <h3>{locationName}</h3>
      </div>

      <div className="timestamps">
        {weatherData.timeseries.map((data, index) => {
          if (indicesToMap.includes(index)) {
            return (
              <div
                key={index}
                className="timestamp">
                <div className="time">{data.time.slice(11, 16)}</div>
                <div className="temperature">{data.data.instant.details.air_temperature.toFixed(0)}°</div>
              </div>
            );
          }

          return null;
        })}
      </div>

      <div className="weather-text">
        <p>
          Humidity: {weatherData.timeseries[2].data.instant.details.relative_humidity.toFixed(0)}%  ·  Wind:{" "}
          {weatherData.timeseries[2].data.instant.details.wind_speed}m/s {degreesToCompass(weatherData.timeseries[2].data.instant.details.wind_from_direction)}
        </p>
      </div>
    </div>
  );
}
