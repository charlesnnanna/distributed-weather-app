const amqp = require('amqplib');
const queueName = 'email_queue';
const { customers } = require('../data.js');
const { sendEmailToUser } = require('./email_sender.js');

async function startEmailService() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: false });

  console.log('Email service is waiting for messages...');

  channel.consume(
    queueName,
    async (msg) => {
      const { user, isRaining } = JSON.parse(msg.content.toString());
      await sendEmailToUser(user, isRaining, customers);

      channel.ack(msg);
    },
    { noAck: false },
  );
}

startEmailService();
