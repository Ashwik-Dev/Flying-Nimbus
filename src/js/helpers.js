// Weather utility functions for descriptions and conversions

export const getDateParts = (dateString) => {
    const date = new Date(dateString);
    return {
        month: date.toLocaleDateString('en-US', {month: 'short'}),
        day: date.toLocaleDateString('en-US', {day: '2-digit'}),
        weekDay: date.toLocaleDateString('en-US', {weekday: 'long'}),
        shortWeekDay: date.toLocaleDateString('en-US', {weekday: 'short'}),
        hour: date.toLocaleDateString('en-US', {hour: '2-digit'})
    };
};

export const splitDateTime = (localTime) => {
    const parts = localTime.split(' ');
    return {
        date: parts[0],
        time: parts[1]
    }
};

export const getFeelsLikeDescription = (temp, scale = 'C') => {
  const thresholds = scale === 'C' 
    ? [0, 11, 21, 26, 31, 36]
    : [32, 51, 69, 78, 87, 96];
  
  const descriptions = ['Freezing', 'Cold', 'Cool', 'Pleasant', 'Warm', 'Hot', 'Very Hot'];
  
  for (let i = 0; i < thresholds.length; i++) {
    if (temp < thresholds[i]) return descriptions[i];
  }
  return descriptions[descriptions.length - 1];
};


export const getUVIndexDescription = (uvIndex) => {
  if (uvIndex === 0) return 'Excellent';
  if (uvIndex <= 2) return 'Low';
  if (uvIndex <= 5) return 'Moderate';
  if (uvIndex <= 7) return 'High';
  if (uvIndex <= 10) return 'Very High';
  return 'Extreme';
};

export const getCloudCoverDescription = (cloudCover) => {
  if (cloudCover <= 10) return 'Clear';
  if (cloudCover <= 25) return 'Mostly Clear';
  if (cloudCover <= 50) return 'Partly Cloudy';
  if (cloudCover <= 69) return 'Mostly Cloudy';
  if (cloudCover <= 89) return 'Overcast';
  return 'Very Overcast';
};

export const getPrecipitationDescription = (precip) => {
  if (precip === 0) return 'No Rain';
  if (precip <= 2.5) return 'Light Rain';
  if (precip <= 7.5) return 'Moderate Rain';
  if (precip <= 50) return 'Heavy Rain';
  return 'Very Heavy Rain';
};

export const getVisibilityDescription = (visibility) => {
  if (visibility > 10) return 'Clear';
  if (visibility >= 6) return 'Mostly Clear';
  if (visibility >= 4) return 'Slightly Hazy';
  if (visibility >= 2) return 'Hazy';
  if (visibility >= 1) return 'Low Visibility';
  return 'Very Low Visibility';
};

export const getHumidityDescription = (humidity) => {
  if (humidity <= 30) return 'Dry';
  if (humidity <= 50) return 'Comfortable';
  if (humidity <= 65) return 'Slightly Humid';
  if (humidity <= 75) return 'Humid';
  if (humidity <= 85) return 'Very Humid';
  return 'Oppressive';
};

export const getAirQualityDescription = (aqiIndex) => {
  switch(aqiIndex) {
    case 1: return 'Good';
    case 2: return 'Moderate';
    case 3: return 'Sensitive';
    case 4: return 'Unhealthy';
    case 5: return 'Very Unhealthy';
    case 6: return 'Hazardous';
    default: return 'Unknown';
  }
};