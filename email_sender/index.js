const nodemailer = require('nodemailer');
const amqp = require('amqplib');

const queueName = 'email_queue';

async function sendEmailForUser(user, isRaining) {
  // Simulate email sending logic
  console.log(
    `Sending email to ${user.name} (${user.email}) - It's ${
      isRaining ? 'raining' : 'not raining'
    }`,
  );
}

async function startEmailService() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: false });

  console.log('Email service is waiting for messages...');

  channel.consume(
    queueName,
    async (msg) => {
      const { user, isRaining } = JSON.parse(msg.content.toString());
      await sendEmailForUser(user, isRaining);

      channel.ack(msg);
    },
    { noAck: false },
  );
}

startEmailService();
