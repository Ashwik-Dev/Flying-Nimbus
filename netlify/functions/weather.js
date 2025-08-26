exports.handler = async function (event, context) {
  // check HTTP Methods
  if (event.httpMethod != "GET") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  // get location from the query parameters
  const { location } = event.queryStringParameters || {};

  if (!location) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "Location is required" }),
    };
  }

  // get API KEY from environment variables
  //   const API_KEY = process.env.WEATHER_API_KEY;
  const API_KEY = "b29ab3c86c1b4ec6a0c144601250608";

  if (!API_KEY) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }

  // call weather API
  try {
    const res = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
        location
      )}&days=7&aqi=yes&alerts=yes`
    );

    if (!res.ok) {
      let errorMessage = `${location} not found. Please enter a valid city name.`;

      if (res.status === 401 || res.status === 403) {
        errorMessage = "Invalid API Key or Access Forbidden.";
      } else if (res.status === 429) {
        errorMessage = "Too Many Requests. Please try again later.";
      } else if (res.status >= 500) {
        errorMessage = "Server Error. Please try again later.";
      }

      return {
        statusCode: res.status,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ message: errorMessage }),
      };
    }

    const data = await res.json();

    if (!data.location || !data.forecast || !data.current) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ message: "Invalid API data received" }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error("Weather API error:", err);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "Failed to fetch weather data" }),
    };
  }
};
