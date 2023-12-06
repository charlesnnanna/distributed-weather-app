import amqp from 'amqplib';
import { customers } from '../data.mjs';
import { getEmailState, getTimeState } from './helper.js';

const queueName = 'email_queue';

async function sendEmailToUser(user, isRaining) {
  // Simulate email sending logic
  const timeState = getTimeState(user);
  const emailStete = getEmailState(timeState.user, customers);
  if (timeState.timeExceeded && isRaining && emailStete.hasNotExceeded) {
    customers[user.index].prevTimestamp = new Date();
    customers[user.index].numberOfReceivedEmails++;
    console.log(
      `Sending email to ${user.name} (${user.email}) - It's raining`,
      user,
    );
  } else {
    console.log('Cannot send email at this time', user);
  }
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
      await sendEmailToUser(user, isRaining);

      channel.ack(msg);
    },
    { noAck: false },
  );
}

startEmailService();
