import { motion } from 'framer-motion';
import { MapPin, Thermometer, ArrowUp, ArrowDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getWeatherInfo } from '../utils/helpers';

export default function CurrentWeather({ weather, city }) {
  if (!weather?.current) return null;

  const { current, daily } = weather;
  const info = getWeatherInfo(current.weather_code, current.is_day);
  const IconComponent = LucideIcons[info.icon] || LucideIcons.Cloud;

  const todayMax = daily?.temperature_2m_max?.[0];
  const todayMin = daily?.temperature_2m_min?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="glass rounded-3xl p-8 text-center h-full flex flex-col justify-center"
    >
      {/* City name */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <MapPin className="w-4 h-4 text-cyan-400" />
        <span className="text-white/90 font-medium text-lg">{city?.name}</span>
        {city?.country && (
          <span className="text-white/40 text-sm">{city.country}</span>
        )}
      </div>

      {/* Animated weather icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        className="flex justify-center mb-4"
      >
        <motion.div
          animate={
            info.icon === 'Sun'
              ? { rotate: 360 }
              : info.icon === 'Snowflake'
              ? { rotate: [0, 180, 360] }
              : { y: [0, -5, 0] }
          }
          transition={
            info.icon === 'Sun'
              ? { duration: 20, repeat: Infinity, ease: 'linear' }
              : info.icon === 'Snowflake'
              ? { duration: 8, repeat: Infinity, ease: 'linear' }
              : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <IconComponent className="w-24 h-24 text-cyan-300 drop-shadow-[0_0_15px_rgba(103,232,249,0.5)]" />
        </motion.div>
      </motion.div>

      {/* Temperature */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-7xl font-extralight text-white mb-1 tracking-tighter">
          {Math.round(current.temperature_2m)}°
        </div>
        <div className="text-white/60 text-lg mb-4">{info.description}</div>
      </motion.div>

      {/* High / Low / Feels like */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-center gap-4 text-sm">
          <span className="flex items-center gap-1 text-orange-300">
            <ArrowUp className="w-3.5 h-3.5" />
            {todayMax !== undefined ? `${Math.round(todayMax)}°` : '--'}
          </span>
          <span className="flex items-center gap-1 text-blue-300">
            <ArrowDown className="w-3.5 h-3.5" />
            {todayMin !== undefined ? `${Math.round(todayMin)}°` : '--'}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2 text-white/40 text-sm">
          <Thermometer className="w-3.5 h-3.5" />
          Feels like {Math.round(current.apparent_temperature)}°
        </div>
      </motion.div>
    </motion.div>
  );
}
