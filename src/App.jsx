import { useWeather } from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import Forecast from './components/Forecast';
import WeatherDetails from './components/WeatherDetails';
import WeatherBackground from './components/WeatherBackground';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, CloudSun } from 'lucide-react';

function App() {
  const {
    city,
    weather,
    loading,
    error,
    suggestions,
    fetchWeather,
    searchCity,
    setSuggestions,
  } = useWeather();

  const weatherCode = weather?.current?.weather_code;
  const isDay = weather?.current?.is_day;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <WeatherBackground weatherCode={weatherCode} isDay={isDay} />

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-8 max-w-6xl flex-1">
          {/* ── Header ── */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <CloudSun className="w-8 h-8 text-cyan-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Weather<span className="text-cyan-400">Cast</span>
              </h1>
            </div>
            <p className="text-white/50 text-sm">
              Real-time weather forecasts worldwide
            </p>
          </motion.header>

          {/* ── Search ── */}
          <SearchBar
            onSearch={searchCity}
            suggestions={suggestions}
            onSelect={(selected) => {
              fetchWeather(selected);
              setSuggestions([]);
            }}
            onClear={() => setSuggestions([])}
          />

          {/* ── Loading ── */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 gap-4"
              >
                <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
                <p className="text-white/40 text-sm">
                  Fetching weather data…
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Error ── */}
          <AnimatePresence>
            {error && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <p className="text-red-300 bg-red-500/10 inline-block px-6 py-3 rounded-2xl backdrop-blur-sm border border-red-500/20">
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Weather Content ── */}
          <AnimatePresence mode="wait">
            {weather && !loading && (
              <motion.div
                key={`${city?.name}-${city?.latitude}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column */}
                  <div className="lg:col-span-1">
                    <CurrentWeather weather={weather} city={city} />
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-2 space-y-6">
                    <HourlyForecast weather={weather} />
                    <WeatherDetails weather={weather} />
                    <Forecast weather={weather} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
