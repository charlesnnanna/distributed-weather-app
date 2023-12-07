// const axios = require('axios');
const amqp = require('amqplib');
const { checkWeatherForUser } = require('./weather_checker');

const queueName = 'weather_queue';

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
