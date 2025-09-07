/// Free weatherAPI (no key required) by Open-Meteo
/// Docs: https://open-meteo.com/en/docs
export const DEFAULT_ICON_URL = "https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all/";
export const DEFAULT_API_URL = "https://api.open-meteo.com/v1/forecast?";
export const WEATHER_API_URL = "daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset,uv_index_max,daylight_duration,sunshine_duration&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,rain,visibility,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m,temperature_80m,uv_index,apparent_temperature,weather_code,is_day&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m,rain,is_day&timezone=auto";
export const DEFAULT_AQI_URL = "https://air-quality-api.open-meteo.com/v1/air-quality?";
export const AQI_API_URL = "hourly=pm2_5,pm10,carbon_monoxide,nitrogen_dioxide,ozone&timezone=auto&forecast_days=5";

export const DEFAULT_GEOLOCATION_URL = "https://photon.komoot.io";

