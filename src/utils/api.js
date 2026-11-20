import axios from 'axios';

const GEO_BASE = 'https://geocoding-api.open-meteo.com/v1';
const WEATHER_BASE = 'https://api.open-meteo.com/v1';

export async function searchCities(query) {
  if (!query || query.trim().length < 2) return [];

  const { data } = await axios.get(`${GEO_BASE}/search`, {
    params: {
      name: query.trim(),
      count: 6,
      language: 'en',
      format: 'json',
    },
  });

  return data.results || [];
}

export async function getWeather(latitude, longitude) {
  const { data } = await axios.get(`${WEATHER_BASE}/forecast`, {
    params: {
      latitude,
      longitude,
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'is_day',
        'weather_code',
        'cloud_cover',
        'pressure_msl',
        'wind_speed_10m',
        'wind_direction_10m',
        'wind_gusts_10m',
      ].join(','),
      hourly: ['temperature_2m', 'weather_code', 'is_day'].join(','),
      daily: [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'precipitation_sum',
        'wind_speed_10m_max',
        'sunrise',
        'sunset',
        'uv_index_max',
      ].join(','),
      timezone: 'auto',
      forecast_days: 7,
    },
  });

  return data;
}
