export interface Location {
  lat: number;
  lng: number;
}

export interface WeatherData {
  timeseries: Timeseries[];
  meta: {
    updated_at: string;
    units: {
      air_pressure_at_sea_level: string;
      air_temperature: string;
      cloud_area_fraction: string;
      precipitation_amount: string;
      relative_humidity: string;
      wind_from_direction: string;
      wind_speed: string;
    };
  };
}

export interface Timeseries {
  time: string;
  data: {
    instant: {
      details: {
        air_pressure_at_sea_level: number;
        air_temperature: number;
        cloud_area_fraction: number;
        relative_humidity: number;
        wind_from_direction: number;
        wind_speed: number;
      };
    };
  };
}
