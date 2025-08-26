import { API_URL, API_KEY, API_DAYS, API_AQI, API_ALERT } from "./config.js";
import * as helpers from "./helpers.js";
// import cache from "./cache.js";

// Obj to store data
let state = {
  weekForecast: {},
  dayForecast: {},
  hourForecast: {},
  record: {},
};

export const getLocation = async function (cityName) {
  try {
    // const cachedResult = cache.get(cityName);
    // if (cachedResult && !cache.shouldRefresh(cityName)) {
    //   console.log(`Using cached data for ${cityName}`);
    //   console.log(`📊 Cache freshness:`, cachedResult.freshness);
    //   return cachedResult.data;
    // }

    // console.log(`🌐 Fetching fresh data for ${cityName}`);

    // const res = await fetch(
    //   `${API_URL}key=${API_KEY}&q=${cityName}&days=${API_DAYS}&aqi=${API_AQI}&alerts=${API_ALERT}`
    // );

    // if (!res.ok) {
    //   let errorMessage = `${cityName} not found. Please enter a valid city name.`;

    //   if (res.status === 401 || res.status === 403) {
    //     errorMessage = "Invalid API Key or Access Forbidden.";
    //   } else if (res.status === 429) {
    //     errorMessage = "Too Many Requests. Please try again later.";
    //   } else if (res.status >= 500) {
    //     errorMessage = "Server Error. Please try again later.";
    //   }

    //   throw new Error(errorMessage);
    // }

    const res = await fetch(
      `/.netlify/functions/weather?location=${encodeURIComponent(cityName)}`
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch weather data");
    }

    const data = await res.json();

    if (!data.location || !data.forecast || !data.current) {
      throw new Error("Invalid API data received");
    }

    const dateNow = new Date(data.location.localtime);
    const hour = dateNow.getHours();

    state.weekForecast = data.forecast.forecastday; // week forecast
    state.dayForecast = state.weekForecast[0]; // day forecast
    state.hourForecast = state.dayForecast.hour[hour]; // hour forecast

    state.record = {
      realHour: hour,
      // from alerts and location
      alerts: data.alerts?.[0] || null,
      location: {
        country: data.location.country,
        region: data.location.region,
        city: data.location.name,
        latitude: data.location.lat,
        longitude: data.location.lon,
        localTime: data.location.localtime,

        // time details
        curDate: helpers.splitDateTime(data.location.localtime).date,
        curMonth: helpers.getDateParts(data.location.localtime).month,
        curDay: helpers.getDateParts(data.location.localtime).day,
        curWeekDay: helpers.getDateParts(data.location.localtime).weekDay,
        curTime: helpers.splitDateTime(data.location.localtime).time,

        localTimeEpoch: data.location.localtime_epoch,
        timeZone: data.location.tz_id,
      },
      // from current
      current: data.current,

      // from week's forecast
      forecast: data.forecast.forecastday,

      // from day's forecast
      date: state.dayForecast.date,
      dateEpoch: state.dayForecast.date_epoch,
      sunrise: state.dayForecast.astro.sunrise,
      sunset: state.dayForecast.astro.sunset,

      curText: state.dayForecast.day.condition.text,
      curIcon: state.dayForecast.day.condition.icon,
      curCode: state.dayForecast.day.condition.code,

      maxTempC: state.dayForecast.day.maxtemp_c,
      minTempC: state.dayForecast.day.mintemp_c,
      maxTempF: state.dayForecast.day.maxtemp_f,
      minTempF: state.dayForecast.day.mintemp_f,
      //from hour's forecast
      aqi: {
        co: state.hourForecast.air_quality.co,
        no2: state.hourForecast.air_quality.no2,
        so2: state.hourForecast.air_quality.so2,
        o3: state.hourForecast.air_quality.o3,
        pm2_5: state.hourForecast.air_quality.pm2_5,
        pm10: state.hourForecast.air_quality.pm10,
        gbIndex: state.hourForecast.air_quality["gb-defra-index"],
        usIndex: state.hourForecast.air_quality["us-epa-index"],
      },
      chanceOfRain: state.hourForecast.daily_chance_of_rain,
      chanceOfSnow: state.hourForecast.daily_chance_of_snow,
      cloud: state.hourForecast.cloud,

      des: state.hourForecast.condition.text,
      icon: state.hourForecast.condition.icon,
      code: state.hourForecast.condition.code,

      dewPointC: state.hourForecast.dewpoint_c,
      dewPointF: state.hourForecast.dewpoint_f,
      diffRad: state.hourForecast.diff_rad,
      dni: state.hourForecast.dni,
      feelsLikeC: state.hourForecast.feelslike_c,
      feelsLikeF: state.hourForecast.feelslike_f,
      gti: state.hourForecast.gti,
      gust: state.hourForecast.gust_kph,
      heatIndexC: state.hourForecast.heatindex_c,
      heatIndexF: state.hourForecast.heatindex_f,
      humidity: state.hourForecast.humidity,
      precip: state.hourForecast.precip_mm,
      pressure: state.hourForecast.pressure_mb,
      tempC: state.hourForecast.temp_c,
      tempF: state.hourForecast.temp_f,
      time: state.hourForecast.time,
      timeEpoch: state.hourForecast.time_epoch,

      uvIndex: state.hourForecast.uv,
      visibility: state.hourForecast.vis_km,
      windDegree: state.hourForecast.wind_degree,
      windDirection: state.hourForecast.wind_dir,
      windSpeed: state.hourForecast.wind_kph,

      tempScale: "c",
    };

    // cache.set(cityName, state.record);

    return state.record;
  } catch (err) {
    throw err;
  }
};

export const getGeoLocation = function () {
  return new Promise(function (resolve, reject) {
    if (!navigator.geolocation) {
      const errs = new Error("Geolocation is not supported in this Browser");
      reject(errs);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const geoLocationValue = `${latitude},${longitude}`;
        // const geoLocationValue = ``;
        resolve(geoLocationValue);
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
  state.record.tempScale = state.record.tempScale === "c" ? "f" : "c";
  return state.record;
};
