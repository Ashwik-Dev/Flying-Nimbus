import { DEFAULT_API_URL, WEATHER_API_URL, DEFAULT_AQI_URL, AQI_API_URL, DEFAULT_GEOLOCATION_URL } from "./config.js";


// Obj to store data
let state = {
  geoLocation: {},
  record: {},
};


export const getGeoLocation = async function (cityName, coords) {
  try {
    let res;
    if(cityName) {
      res = await fetch(`${DEFAULT_GEOLOCATION_URL}/api/?q=${cityName}&limit=1`);
    } else {
      res = await fetch(`${DEFAULT_GEOLOCATION_URL}/reverse/?lat=${coords.lat}&lon=${coords.lng}`);
    }

    if (!res.ok) throw new Error("Failed to fetch geolocation data");

    let data = await res.json();
    data = data.features[0];

    state.geoLocation = {
      country: data.properties.country,
      region: data.properties.state,
      city: data.properties.name,
      lat: data.geometry.coordinates[1],
      lng: data.geometry.coordinates[0],
    };

    return state.geoLocation;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getLocation = async function (location) {
  try {

    const weatherRes = await fetch(`${DEFAULT_API_URL}latitude=${location.lat}&longitude=${location.lng}&${WEATHER_API_URL}`);

    const aqiRes =
      await fetch(`${DEFAULT_AQI_URL}latitude=${location.lat}&longitude=${location.lng}&${AQI_API_URL}`);

    if (!weatherRes.ok) {
      let errorMessage = `${location.city} not found. Please enter a valid city name.`;

      if (weatherRes.status === 401 || weatherRes.status === 403) {
        errorMessage = "Invalid API Key or Access Forbidden.";
      } else if (weatherRes.status === 429) {
        errorMessage = "Too Many Requests. Please try again later.";
      } else if (weatherRes.status >= 500) {
        errorMessage = "Server Error. Please try again later.";
      }

      throw new Error(errorMessage);
    }

    if(!aqiRes.ok) throw new Error("Failed to fetch air quality data");

    const weatherData = await weatherRes.json();

    if (!weatherData) throw new Error("Invalid API data received");

    const aqiData = await aqiRes.json();
    
    if (!weatherData) throw new Error("Invalid API data received");

    const dateNow = new Date(weatherData.current.time);
    const hour = dateNow.getHours();

    state.record = {
      realHour: hour,

      location: {
        country: location.country,
        region: location.region,
        city: location.city,
        latitude: location.lat,
        longitude: location.lng,

        // time details
        curDate: dateNow.getDate(),
        curMonth: dateNow.getMonth() + 1,
        curYear: dateNow.getFullYear(),
        curWeekDay: dateNow.getDay(),
        curTime: weatherData.current.time.split("T")[1],
      },
      // from current
      current: weatherData.current,
      currentUnits: weatherData.current_units,
      currentTime: weatherData.current.time,
      currentIsDay: weatherData.current.is_day,

      // from daily forecast
      daily: weatherData.daily,
      dailyUnits: weatherData.daily_units,
      sunrise: weatherData.daily.sunrise,
      sunset: weatherData.daily.sunset,
      date: weatherData.daily.time,
      dailyWeatherCode: weatherData.daily.weather_code,
      maxTempC: weatherData.daily.temperature_2m_max,
      minTempC: weatherData.daily.temperature_2m_min,

      // from hourly forecast
      hourly: weatherData.hourly,
      hourlyUnits: weatherData.hourly_units,    
  
      aqi: {
        co: aqiData.hourly.carbon_monoxide,
        no2: aqiData.hourly.nitrogen_dioxide,
        o3: aqiData.hourly.ozone,
        pm2_5: aqiData.hourly.pm2_5,
        pm10: aqiData.hourly.pm10,
        time: aqiData.hourly.time,
      },
      chanceOfRain: weatherData.hourly.precipitation_probability,
      precip: weatherData.hourly.precipitation,
      rain: weatherData.hourly.rain,
      cloud: weatherData.hourly.cloud_cover,
      feelsLikeC: weatherData.hourly.apparent_temperature,
      humidity: weatherData.hourly.relative_humidity_2m,
      pressure: weatherData.hourly.surface_pressure,
      tempC2: weatherData.hourly.temperature_2m,
      tempC80: weatherData.hourly.temperature_80m,
      time: weatherData.hourly.time,
      isDay: weatherData.hourly.is_day,
      uvIndex: weatherData.hourly.uv_index,
      visibility: weatherData.hourly.visibility,
      weatherCode: weatherData.hourly.weather_code,
      gust: weatherData.hourly.wind_gusts_10m,
      windDirection: weatherData.hourly.wind_direction_10m,
      windSpeed: weatherData.hourly.wind_speed_10m,

      tempScale: "C",
    };

    return state.record;
  } catch (err) {
    throw err;
  }
};

export const getCurrentLocation = function () {
  return new Promise(function (resolve, reject) {
    if (!navigator.geolocation) {
      const errs = new Error("Geolocation is not supported in this Browser");
      reject(errs);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ lat: latitude, lng: longitude });
      },
      (err) => reject(err)
    );
  });
};

export const toggleTempScale = function () {
  if (!state.record || Object.keys(state.record).length === 0) {
    throw new Error(
      "No weather data available. Please search for a city first."
    );
  }
  state.record.tempScale = state.record.tempScale === "C" ? "F" : "C";
  return state.record;
};
