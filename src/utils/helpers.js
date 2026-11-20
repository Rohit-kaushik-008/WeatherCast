export const WMO_CODES = {
  0: { description: "Clear Sky", icon: "Sun", nightIcon: "Moon" },
  1: { description: "Mainly Clear", icon: "Sun", nightIcon: "Moon" },
  2: { description: "Partly Cloudy", icon: "CloudSun", nightIcon: "CloudMoon" },
  3: { description: "Overcast", icon: "Cloud", nightIcon: "Cloud" },
  45: { description: "Foggy", icon: "CloudFog", nightIcon: "CloudFog" },
  48: { description: "Rime Fog", icon: "CloudFog", nightIcon: "CloudFog" },
  51: {
    description: "Light Drizzle",
    icon: "CloudDrizzle",
    nightIcon: "CloudDrizzle",
  },
  53: {
    description: "Moderate Drizzle",
    icon: "CloudDrizzle",
    nightIcon: "CloudDrizzle",
  },
  55: {
    description: "Dense Drizzle",
    icon: "CloudDrizzle",
    nightIcon: "CloudDrizzle",
  },
  56: {
    description: "Freezing Drizzle",
    icon: "CloudHail",
    nightIcon: "CloudHail",
  },
  57: {
    description: "Dense Freezing Drizzle",
    icon: "CloudHail",
    nightIcon: "CloudHail",
  },
  61: { description: "Slight Rain", icon: "CloudRain", nightIcon: "CloudRain" },
  63: {
    description: "Moderate Rain",
    icon: "CloudRain",
    nightIcon: "CloudRain",
  },
  65: {
    description: "Heavy Rain",
    icon: "CloudRainWind",
    nightIcon: "CloudRainWind",
  },
  66: {
    description: "Freezing Rain",
    icon: "CloudHail",
    nightIcon: "CloudHail",
  },
  67: {
    description: "Heavy Freezing Rain",
    icon: "CloudHail",
    nightIcon: "CloudHail",
  },
  71: { description: "Slight Snow", icon: "Snowflake", nightIcon: "Snowflake" },
  73: {
    description: "Moderate Snow",
    icon: "Snowflake",
    nightIcon: "Snowflake",
  },
  75: { description: "Heavy Snow", icon: "Snowflake", nightIcon: "Snowflake" },
  77: { description: "Snow Grains", icon: "Snowflake", nightIcon: "Snowflake" },
  80: {
    description: "Slight Showers",
    icon: "CloudRain",
    nightIcon: "CloudRain",
  },
  81: {
    description: "Moderate Showers",
    icon: "CloudRain",
    nightIcon: "CloudRain",
  },
  82: {
    description: "Violent Showers",
    icon: "CloudRainWind",
    nightIcon: "CloudRainWind",
  },
  85: {
    description: "Snow Showers",
    icon: "CloudSnow",
    nightIcon: "CloudSnow",
  },
  86: {
    description: "Heavy Snow Showers",
    icon: "CloudSnow",
    nightIcon: "CloudSnow",
  },
  95: {
    description: "Thunderstorm",
    icon: "CloudLightning",
    nightIcon: "CloudLightning",
  },
  96: {
    description: "Thunderstorm with Hail",
    icon: "CloudLightning",
    nightIcon: "CloudLightning",
  },
  99: {
    description: "Severe Thunderstorm",
    icon: "CloudLightning",
    nightIcon: "CloudLightning",
  },
};

export function getWeatherInfo(code, isDay = 1) {
  const info = WMO_CODES[code] || {
    description: "Unknown",
    icon: "Cloud",
    nightIcon: "Cloud",
  };
  return {
    description: info.description,
    icon: isDay ? info.icon : info.nightIcon,
  };
}

export function getWindDirection(degrees) {
  const dirs = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return dirs[Math.round(degrees / 22.5) % 16];
}

export function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
}

export function formatDay(isoString) {
  const date = new Date(isoString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatSunTime(isoString) {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function getBackgroundGradient(code, isDay) {
  if (code === undefined || code === null)
    return "from-indigo-900 via-purple-900 to-slate-900";

  const night = !isDay;

  if (code <= 1)
    return night
      ? "from-indigo-950 via-blue-950 to-slate-950"
      : "from-sky-400 via-blue-500 to-indigo-600";
  if (code <= 3)
    return night
      ? "from-slate-800 via-indigo-900 to-slate-950"
      : "from-blue-400 via-slate-400 to-blue-500";
  if (code <= 48)
    return night
      ? "from-gray-800 via-slate-800 to-gray-900"
      : "from-gray-400 via-slate-400 to-gray-500";
  if (code <= 67)
    return night
      ? "from-slate-900 via-blue-950 to-gray-950"
      : "from-slate-500 via-blue-700 to-slate-700";
  if (code <= 86)
    return night
      ? "from-slate-800 via-blue-900 to-indigo-950"
      : "from-slate-300 via-blue-300 to-indigo-400";
  if (code <= 99)
    return night
      ? "from-gray-950 via-purple-950 to-slate-950"
      : "from-gray-700 via-purple-800 to-slate-800";

  return "from-indigo-900 via-purple-900 to-slate-900";
}

export function getWeatherCategory(code) {
  if (code <= 1) return "clear";
  if (code <= 3) return "cloudy";
  if (code <= 48) return "fog";
  if (code <= 67) return "rain";
  if (code <= 86) return "snow";
  if (code <= 99) return "thunder";
  return "clear";
}
