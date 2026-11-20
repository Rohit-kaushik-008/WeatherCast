import { useState, useEffect, useCallback } from 'react';
import { searchCities, getWeather } from '../utils/api';

export function useWeather() {
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const fetchWeather = useCallback(async (selectedCity) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(
        selectedCity.latitude,
        selectedCity.longitude
      );
      setWeather(data);
      setCity(selectedCity);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchCity = useCallback(async (query) => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const results = await searchCities(query);
      setSuggestions(results);
    } catch {
      setSuggestions([]);
    }
  }, []);

  /* Load a default city on mount */
  useEffect(() => {
    fetchWeather({
      name: 'New Delhi',
      country: 'India',
      latitude: 28.6139,
      longitude: 77.209,
      admin1: 'Delhi',
    });
  }, [fetchWeather]);

  return {
    city,
    weather,
    loading,
    error,
    suggestions,
    fetchWeather,
    searchCity,
    setSuggestions,
  };
}
