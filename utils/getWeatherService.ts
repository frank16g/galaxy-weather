export const weatherIconMap: Record<string, string> = {
  '01d': 'ClearDay',
  '01n': 'ClearNight',
  '02d': 'PartlyCloudDay',
  '02n': 'PartlyCloudNight',
  '03d': 'Cloudy',
  '03n': 'Cloudy',
  '04d': 'Overcast',
  '04n': 'Overcast',
  '09d': 'Rain',
  '09n': 'Rain',
  '10d': 'PartlyCloudDayRain',
  '10n': 'PartlyCloudNightRain',
  '11d': 'Thunderstorms',
  '11n': 'Thunderstorms',
  '13d': 'Snow',
  '13n': 'Snow',
  '50d': 'Mist',
  '50n': 'Mist'
};

export function getOpenWeatherIconUrl(code: string | undefined, size = 4) {
  if (!code) return '';
  // size = 1,2,4 -> @1x @2x @4x
  return `https://openweathermap.org/img/wn/${code}@${size}x.png`;
}

