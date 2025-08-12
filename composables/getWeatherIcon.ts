export function getWeatherIcon(code?: string, size: 1 | 2 | 4 = 4): string {
  if (!code) return '';
  return `https://openweathermap.org/img/wn/${code}@${size}x.png`;
}
