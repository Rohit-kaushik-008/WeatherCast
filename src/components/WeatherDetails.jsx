import { motion } from 'framer-motion';
import {
  Droplets,
  Wind,
  Gauge,
  Eye,
  Sunrise,
  Sunset,
  Compass,
  Sun as SunIcon,
} from 'lucide-react';
import { getWindDirection, formatSunTime } from '../utils/helpers';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
};

export default function WeatherDetails({ weather }) {
  if (!weather?.current) return null;

  const { current, daily } = weather;

  const details = [
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${current.relative_humidity_2m}%`,
      color: 'text-blue-400',
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${Math.round(current.wind_speed_10m)} km/h`,
      color: 'text-teal-400',
    },
    {
      icon: Compass,
      label: 'Wind Direction',
      value: `${getWindDirection(current.wind_direction_10m)} (${current.wind_direction_10m}°)`,
      color: 'text-emerald-400',
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${Math.round(current.pressure_msl)} hPa`,
      color: 'text-purple-400',
    },
    {
      icon: SunIcon,
      label: 'UV Index',
      value:
        daily?.uv_index_max?.[0] !== undefined
          ? `${daily.uv_index_max[0].toFixed(1)}`
          : '--',
      color: 'text-yellow-400',
    },
    {
      icon: Eye,
      label: 'Cloud Cover',
      value: `${current.cloud_cover}%`,
      color: 'text-gray-400',
    },
    {
      icon: Sunrise,
      label: 'Sunrise',
      value: daily?.sunrise?.[0] ? formatSunTime(daily.sunrise[0]) : '--',
      color: 'text-orange-400',
    },
    {
      icon: Sunset,
      label: 'Sunset',
      value: daily?.sunset?.[0] ? formatSunTime(daily.sunset[0]) : '--',
      color: 'text-rose-400',
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-4 gap-3"
    >
      {details.map((d) => (
        <motion.div
          key={d.label}
          variants={item}
          whileHover={{ scale: 1.03 }}
          className="glass rounded-2xl p-4 flex flex-col items-center text-center gap-2"
        >
          <d.icon className={`w-5 h-5 ${d.color}`} />
          <span className="text-white/40 text-xs uppercase tracking-wider">
            {d.label}
          </span>
          <span className="text-white font-semibold text-sm">{d.value}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
