const { weatherCache, weatherData } = require('../data');

async function checkWeatherForUser(user) {
  const currentTime = Date.now();

  // Check if the data is in the cache and not expired
  if (
    weatherCache.data &&
    currentTime - weatherCache.timestamp < weatherCache.expiration
  ) {
    console.log('Using cached weather data.');
    return weatherCache.data;
  }

  try {
    // Simulate weather checking logic
    const isRaining = weatherData.current.condition ? true : false;
    console.log(isRaining);

    // Update the Cache
    weatherCache.data = { user, isRaining };
    weatherCache.timestamp = currentTime;
    return { user, isRaining };
  } catch (error) {
    console.error('Error checking weather:', error.message);
    return null;
  }
}

exports.checkWeatherForUser = checkWeatherForUser;
