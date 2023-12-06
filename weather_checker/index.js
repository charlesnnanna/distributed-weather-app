// const axios = require('axios');
import amqp from 'amqplib';
import { weatherData, weatherCache } from '../data.mjs';

const queueName = 'weather_queue';

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
    weatherData.timestamp = currentTime;
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
