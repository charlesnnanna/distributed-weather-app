const axios = require('axios');
const amqp = require('amqplib');

const weatherApiEndpoint = 'YOUR_WEATHER_API_ENDPOINT';
const queueName = 'weather_queue';

async function checkWeatherForUser(user) {
  try {
    const response = await axios.get(weatherApiEndpoint);
    const weatherData = response.data;

    // Simulate weather checking logic
    const isRaining = weatherData.weather.includes('rain');
    return { user, isRaining };
  } catch (error) {
    console.error('Error checking weather:', error.message);
    return null;
  }
}

async function startWeatherService() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: false });

  console.log('Weather service is waiting for messages...');

  channel.consume(
    queueName,
    async (msg) => {
      const user = JSON.parse(msg.content.toString());
      const result = await checkWeatherForUser(user);

      if (result) {
        // Send the result to the next queue (e.g., email_queue)
        channel.sendToQueue('email_queue', Buffer.from(JSON.stringify(result)));
      }

      channel.ack(msg);
    },
    { noAck: false },
  );
}

startWeatherService();
