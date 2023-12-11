const customers = [
  {
    index: 0,
    email: 'charlesuthulor@gmail.com',
    name: 'Charles Uthulor',
    numberOfReceivedEmails: 0,
    prevTimestamp: 0,
  },
  {
    index: 1,
    email: 'praximeto@gmail.com',
    name: 'Pierre Doc',
    numberOfReceivedEmails: 0,
    prevTimestamp: 0,
  },
  {
    index: 2,
    email: 'luciusfoc@outlook.com',
    name: 'Lucius Fox',
    numberOfReceivedEmails: 0,
    prevTimestamp: 0,
  },
  {
    index: 3,
    email: 'littlemike@gmail.com',
    name: 'Mike Adams',
    numberOfReceivedEmails: 0,
    prevTimestamp: 0,
  },
];

const weatherData = {
  location: 'Antwerp, Belgium',
  current: {
    weather_condition: {
      rain: true,
      snow: false,
      sunny: false,
    },
  },
};

const weatherCache = {
  data: null,
  timestamp: 0,
  expiration: 10 * 60 * 1000, // Cache expires after 10 minutes
};

// API that gets the weather data
async function getWeatherData() {
  return weatherData;
}

module.exports = {
  customers,
  weatherCache,
  weatherData,
  getWeatherData,
};
