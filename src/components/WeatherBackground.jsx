import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { getBackgroundGradient, getWeatherCategory } from '../utils/helpers';

/* ── tiny reusable particle components ── */

function FloatingParticle({ delay, duration, x, y, size, opacity, color }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        opacity,
        left: `${x}%`,
        top: `${y}%`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        opacity: [opacity, opacity * 0.5, opacity],
        scale: [1, 1.2, 1],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function RainDrop({ delay, x }) {
  return (
    <motion.div
      className="absolute w-0.5 h-6 bg-blue-300/20 rounded-full pointer-events-none"
      style={{ left: `${x}%` }}
      initial={{ top: '-5%', opacity: 0 }}
      animate={{ top: '105%', opacity: [0, 0.6, 0] }}
      transition={{
        duration: 1 + Math.random() * 0.5,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

function SnowFlake({ delay, x, size }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white/30 pointer-events-none"
      style={{ left: `${x}%`, width: size, height: size }}
      initial={{ top: '-5%', opacity: 0 }}
      animate={{ top: '105%', opacity: [0, 0.5, 0], x: [0, 20, -20, 0] }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

/* ── main background ── */

export default function WeatherBackground({ weatherCode, isDay }) {
  const gradient = getBackgroundGradient(weatherCode, isDay);
  const category = getWeatherCategory(weatherCode ?? 0);

  const particles = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 100 + 50,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 8,
        opacity: 0.03 + Math.random() * 0.05,
      })),
    []
  );

  const rainDrops = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
      })),
    []
  );

  const snowFlakes = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 6 + 3,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br ${gradient} transition-all duration-1000`}
    >
      {/* ambient blobs */}
      {particles.map((p) => (
        <FloatingParticle
          key={p.id}
          x={p.x}
          y={p.y}
          size={p.size}
          delay={p.delay}
          duration={p.duration}
          opacity={p.opacity}
          color={
            category === 'rain'
              ? '#60a5fa'
              : category === 'snow'
              ? '#e2e8f0'
              : category === 'thunder'
              ? '#c084fc'
              : isDay
              ? '#fbbf24'
              : '#818cf8'
          }
        />
      ))}

      {/* rain */}
      {category === 'rain' &&
        rainDrops.map((d) => <RainDrop key={d.id} x={d.x} delay={d.delay} />)}

      {/* snow */}
      {category === 'snow' &&
        snowFlakes.map((f) => (
          <SnowFlake key={f.id} x={f.x} size={f.size} delay={f.delay} />
        ))}

      {/* film-grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
