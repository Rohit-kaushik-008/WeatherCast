import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getWeatherInfo, formatDay } from '../utils/helpers';

export default function Forecast({ weather }) {
  if (!weather?.daily) return null;

  const { daily } = weather;
  const days = daily.time.map((time, i) => ({
    time,
    code: daily.weather_code[i],
    max: daily.temperature_2m_max[i],
    min: daily.temperature_2m_min[i],
    precip: daily.precipitation_sum[i],
  }));

  const globalMin = Math.min(...days.map((d) => d.min));
  const globalMax = Math.max(...days.map((d) => d.max));
  const range = globalMax - globalMin || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-3xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-cyan-400" />
        <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider">
          7-Day Forecast
        </h3>
      </div>

      <div className="space-y-1">
        {days.map((day, index) => {
          const info = getWeatherInfo(day.code, 1);
          const Icon = LucideIcons[info.icon] || LucideIcons.Cloud;
          const leftOffset = ((day.min - globalMin) / range) * 100;
          const barWidth = ((day.max - day.min) / range) * 100;

          return (
            <motion.div
              key={day.time}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              className="flex items-center gap-4 py-3 px-3 rounded-xl hover:bg-white/5 transition-colors"
            >
              {/* Day */}
              <span className="text-white/80 text-sm font-medium w-24 flex-shrink-0">
                {formatDay(day.time)}
              </span>

              {/* Icon */}
              <Icon className="w-5 h-5 text-cyan-300/70 flex-shrink-0" />

              {/* Min */}
              <span className="text-white/40 text-sm w-10 text-right flex-shrink-0">
                {Math.round(day.min)}°
              </span>

              {/* Temperature bar */}
              <div className="flex-1 h-1.5 bg-white/10 rounded-full relative mx-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(barWidth, 4)}%` }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="absolute h-full rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-orange-400"
                  style={{ left: `${leftOffset}%` }}
                />
              </div>

              {/* Max */}
              <span className="text-white font-semibold text-sm w-10 flex-shrink-0">
                {Math.round(day.max)}°
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
