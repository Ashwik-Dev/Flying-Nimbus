// Weather utility functions for descriptions and conversions
import { DEFAULT_ICON_URL } from "./config";

export const getTimeIn12HourFormat = (time) => {
  let [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute.toString().padStart(2, "0")} ${period}`;
};

export const convertCtoF = (celsius) => (celsius * 9) / 5 + 32;

export const convertFtoC = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;

export const getFeelsLikeDescription = (temp, scale = "C") => {
  const thresholds =
    scale === "C" ? [0, 11, 21, 26, 31, 36] : [32, 51, 69, 78, 87, 96];

  const descriptions = [
    "Freezing",
    "Cold",
    "Cool",
    "Pleasant",
    "Warm",
    "Hot",
    "Very Hot",
  ];

  let describe;
  for (let i = 0; i < thresholds.length; i++) {
    if (temp > thresholds[thresholds.length - 1]) {
      describe = descriptions[descriptions.length - 1];
    } else if (temp <= thresholds[i]) {
      describe = descriptions[i];
    }
  }
  // return descriptions[descriptions.length - 1];
  return describe;
};

export const getUVIndexDescription = (uvIndex) => {
  if (uvIndex === 0) return "Excellent";
  if (uvIndex <= 2) return "Low";
  if (uvIndex <= 5) return "Moderate";
  if (uvIndex <= 7) return "High";
  if (uvIndex <= 10) return "Very High";
  return "Extreme";
};

export const getCloudCoverDescription = (cloudCover) => {
  if (cloudCover <= 10) return "Clear";
  if (cloudCover <= 25) return "Mostly Clear";
  if (cloudCover <= 50) return "Partly Cloudy";
  if (cloudCover <= 69) return "Mostly Cloudy";
  if (cloudCover <= 89) return "Overcast";
  return "Very Overcast";
};

export const getPrecipitationDescription = (precip) => {
  if (precip === 0) return "No Rain";
  if (precip <= 2.5) return "Light Rain";
  if (precip <= 7.5) return "Moderate Rain";
  if (precip <= 50) return "Heavy Rain";
  return "Very Heavy Rain";
};

export const getVisibilityDescription = (visibility) => {
  if (visibility > 10) return "Clear";
  if (visibility >= 6) return "Mostly Clear";
  if (visibility >= 4) return "Slightly Hazy";
  if (visibility >= 2) return "Hazy";
  if (visibility >= 1) return "Low Visibility";
  return "Very Low Visibility";
};

export const getHumidityDescription = (humidity) => {
  if (humidity <= 30) return "Dry";
  if (humidity <= 50) return "Comfortable";
  if (humidity <= 65) return "Slightly Humid";
  if (humidity <= 75) return "Humid";
  if (humidity <= 85) return "Very Humid";
  return "Oppressive";
};

export const getAirQualityDescription = (pm25) => {
  if (pm25 <= 12)
    return { aqi: Math.trunc((50 / 12) * pm25), category: "Good" };
  if (pm25 <= 35.4)
    return {
      aqi: Math.trunc(51 + (49 / 23.4) * (pm25 - 12.1)),
      category: "Moderate",
    };
  if (pm25 <= 55.4)
    return {
      aqi: Math.trunc(101 + (49 / 20) * (pm25 - 35.5)),
      category: "Unhealthy for Sensitive Groups",
    };
  if (pm25 <= 150.4)
    return {
      aqi: Math.trunc(151 + (49 / 95) * (pm25 - 55.5)),
      category: "Unhealthy",
    };
  if (pm25 <= 250.4)
    return {
      aqi: Math.trunc(201 + (99 / 100) * (pm25 - 150.5)),
      category: "Very Unhealthy",
    };
  return {
    aqi: Math.trunc(301 + (199 / 149.5) * (pm25 - 250.5)),
    category: "Hazardous",
  };
};

export const getLongWeekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const getWindDirections = function (num) {
  const directions = [
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
  const index = Math.floor(num / 22.5) % 16;
  return directions[index];
};

export const getIsDayBool = (isDay) => (isDay === 0 ? false : true);

export const getWeatherDetails = (weatherCode, isDay = true) => {
  const weatherMap = {
    0: {
      description: "Clear sky",
      dayIcon: "clear-day.svg",
      nightIcon: "clear-night.svg",
    },
    1: {
      description: "Mainly clear",
      dayIcon: "clear-day.svg",
      nightIcon: "clear-night.svg",
    },
    2: {
      description: "Partly cloudy",
      dayIcon: "partly-cloudy-day.svg",
      nightIcon: "partly-cloudy-night.svg",
    },
    3: {
      description: "Overcast",
      dayIcon: "overcast-day.svg",
      nightIcon: "overcast-night.svg",
    },
    45: {
      description: "Fog",
      dayIcon: "fog-day.svg",
      nightIcon: "fog-night.svg",
    },
    48: {
      description: "Depositing rime fog",
      dayIcon: "fog-day.svg",
      nightIcon: "fog-night.svg",
    },
    51: {
      description: "Drizzle light",
      dayIcon: "partly-cloudy-day-drizzle.svg",
      nightIcon: "partly-cloudy-night-drizzle.svg",
    },
    53: {
      description: "Drizzle moderate",
      dayIcon: "partly-cloudy-day-drizzle.svg",
      nightIcon: "partly-cloudy-night-drizzle.svg",
    },
    55: {
      description: "Drizzle heavy",
      dayIcon: "drizzle.svg",
      nightIcon: "drizzle.svg",
    },
    56: {
      description: "Freezing drizzle light",
      dayIcon: "partly-cloudy-day-sleet.svg",
      nightIcon: "partly-cloudy-night-sleet.svg",
    },
    57: {
      description: "Freezing drizzle heavy",
      dayIcon: "drizzle.svg",
      nightIcon: "drizzle.svg",
    },
    61: {
      description: "Rain slight",
      dayIcon: "partly-cloudy-day-rain.svg",
      nightIcon: "partly-cloudy-night-rain.svg",
    },
    63: {
      description: "Rain moderate",
      dayIcon: "rain.svg",
      nightIcon: "rain.svg",
    },
    65: {
      description: "Rain heavy",
      dayIcon: "rain.svg",
      nightIcon: "rain.svg",
    },
    66: {
      description: "Freezing rain light",
      dayIcon: "sleet.svg",
      nightIcon: "sleet.svg",
    },
    67: {
      description: "Freezing rain heavy",
      dayIcon: "sleet.svg",
      nightIcon: "sleet.svg",
    },
    71: {
      description: "Snow fall slight",
      dayIcon: "partly-cloudy-day-snow.svg",
      nightIcon: "partly-cloudy-night-snow.svg",
    },
    73: {
      description: "Snow fall moderate",
      dayIcon: "snow.svg",
      nightIcon: "snow.svg",
    },
    75: {
      description: "Snow fall heavy",
      dayIcon: "snow.svg",
      nightIcon: "snow.svg",
    },
    77: {
      description: "Snow grains",
      dayIcon: "snow.svg",
      nightIcon: "snow.svg",
    },
    80: {
      description: "Rain Showers light",
      dayIcon: "partly-cloudy-day-rain.svg",
      nightIcon: "partly-cloudy-night-rain.svg",
    },
    81: {
      description: "Rain Showers moderate",
      dayIcon: "rain.svg",
      nightIcon: "rain.svg",
    },
    82: {
      description: "Rain Showers violent",
      dayIcon: "rain.svg",
      nightIcon: "rain.svg",
    },
    85: {
      description: "Snow Showers slight",
      dayIcon: "partly-cloudy-day-snow.svg",
      nightIcon: "partly-cloudy-night-snow.svg",
    },
    86: {
      description: "Snow Showers heavy",
      dayIcon: "snow.svg",
      nightIcon: "snow.svg",
    },
    95: {
      description: "Thunderstorms",
      dayIcon: "thunderstorms-day.svg",
      nightIcon: "thunderstorms-night.svg",
    },
    96: {
      description: "Thunderstorms with hail",
      dayIcon: "thunderstorms-day-rain.svg",
      nightIcon: "thunderstorms-night-rain.svg",
    },
    99: {
      description: "Heavy thunderstorms",
      dayIcon: "thunderstorms-rain.svg",
      nightIcon: "thunderstorms-rain.svg",
    },
  };

  const weather = weatherMap[weatherCode] || {
    description: "Unknown weather",
    dayIcon: "not-available.svg",
    nightIcon: "not-available.svg",
  };

  const iconFile = isDay ? weather.dayIcon : weather.nightIcon;

  return {
    description: weather.description,
    icon: DEFAULT_ICON_URL + iconFile,
  };
};
