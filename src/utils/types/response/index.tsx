type Location = {
  name: string;
  region: string;
  country: string;
  localtime: string;
};

type Condition = {
  text: string;
  icon: string;
};

type Day = {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  daily_chance_of_rain: number;
  condition: Condition;
};

export type Hour = {
  time: string;
  temp_c: number;
  temp_f: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  humidity: number;
  chance_of_rain: number;
  will_it_snow: number;
};

type ForecastDay = {
  date: string;
  day: Day;
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
  };
  hour: Hour[];
};

type Current = {
  temp_c: number;
  temp_f: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  humidity: number;
  feelslike_c: number;
  feelslike_f: number;
};

export type ForecastResponse = {
  location: Location;
  current: Current;
  forecast: {
    forecastday: ForecastDay[];
  };
};
