export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherMain {
  temp: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WeatherWind {
  speed: number;
  deg?: number;
}

export interface WeatherSys {
  country?: string;
}

export interface WeatherResponse {
  coord?: { lon: number; lat: number };
  weather: WeatherCondition[];
  base?: string;
  main: WeatherMain;
  visibility?: number;
  wind?: WeatherWind;
  clouds?: { all: number };
  dt?: number;
  sys?: WeatherSys;
  timezone?: number;
  id?: number;
  name: string;
  cod?: number;
}
