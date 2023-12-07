const { checkWeatherForUser } = require('../weather_checker');
const expect = require('chai').expect;

describe('Weather Checker', () => {
  it('should return weather data for a user', async () => {
    const user = { email: 'test@example.com', name: 'Test User' };
    const weatherData = await checkWeatherForUser(user);
    expect(weatherData).to.be.an('object');
    expect(weatherData).to.have.property('user').that.deep.equals(user);
    expect(weatherData).to.have.property('isRaining').that.is.a('boolean');
  });
});
