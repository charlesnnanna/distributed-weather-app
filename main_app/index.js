const express = require('express');
const amqp = require('amqplib');
const cron = require('node-cron');
const { customers } = require('../data');

const app = express();
const PORT = process.env.PORT || 3000;

const queueName = 'weather_queue';

async function startMainApp() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: false });

  // Send each user to the weather checking service
  cron.schedule('*/2 * * * *', async () => {
    customers.forEach((user) => {
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(user)));
      console.log(`${user.name} has been sent to the weather_checker`);
    });
  });
}

startMainApp();

// Start the Express server
app.listen(PORT, () => {
  console.log(`Main app is running on port ${PORT}`);
});
