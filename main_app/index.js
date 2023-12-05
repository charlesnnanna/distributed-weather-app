const express = require('express');
const amqp = require('amqplib');

const app = express();
const PORT = process.env.PORT || 3000;

const customers = [
  { email: 'customer1@example.com', name: 'Customer 1' },
  { email: 'customer2@example.com', name: 'Customer 2' },
  // Add more customers as needed
];

const queueName = 'weather_queue';

async function startMainApp() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: false });

  // Send each user to the weather checking service
  customers.forEach(async (user) => {
    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(user)));
  });
}

startMainApp();

// Start the Express server
app.listen(PORT, () => {
  console.log(`Main app is running on port ${PORT}`);
});
