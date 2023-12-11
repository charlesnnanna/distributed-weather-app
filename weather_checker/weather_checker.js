const { weatherCache, getWeatherData } = require('../data');

async function checkWeatherForUser(user) {
  const currentTime = Date.now();

  // Check if the data is in the cache and not expired
  if (
    weatherCache.data &&
    currentTime - weatherCache.timestamp < weatherCache.expiration
  ) {
    const isRaining = weatherCache.data.current.weather_condition.rain;
    console.log('Using cached weather data.');
    return { user, isRaining };
  }

  try {
    console.log('Fetching Data from API');
    // Fetch weather data
    const data = await getWeatherData();
    const isRaining = data.current.weather_condition.rain;

    // Update the Cache
    weatherCache.data = data;
    weatherCache.timestamp = currentTime;
    return { user, isRaining };
  } catch (error) {
    console.error('Error checking weather:', error.message);
    return null;
  }
}

exports.checkWeatherForUser = checkWeatherForUser;
