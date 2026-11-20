import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getWeatherInfo, formatTime } from '../utils/helpers';

export default function HourlyForecast({ weather }) {
  if (!weather?.hourly) return null;

  const { hourly } = weather;
  const now = new Date();
  const startIndex = Math.max(
    0,
    hourly.time.findIndex((t) => new Date(t) >= now)
  );

  const hours = [];
  for (
    let i = startIndex;
    i < Math.min(startIndex + 24, hourly.time.length);
    i++
  ) {
    hours.push({
      time: hourly.time[i],
      temp: hourly.temperature_2m[i],
      code: hourly.weather_code[i],
      isDay: hourly.is_day[i],
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass rounded-3xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-cyan-400" />
        <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider">
          Hourly Forecast
        </h3>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {hours.map((hour, index) => {
          const info = getWeatherInfo(hour.code, hour.isDay);
          const Icon = LucideIcons[info.icon] || LucideIcons.Cloud;

          return (
            <motion.div
              key={hour.time}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className="flex flex-col items-center gap-2 min-w-[4.5rem] py-3 px-2 rounded-2xl hover:bg-white/5 transition-colors"
            >
              <span className="text-white/50 text-xs font-medium">
                {index === 0 ? 'Now' : formatTime(hour.time)}
              </span>
              <Icon className="w-6 h-6 text-cyan-300/80" />
              <span className="text-white font-semibold text-sm">
                {Math.round(hour.temp)}°
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
