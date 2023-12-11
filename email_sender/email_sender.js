const { getTimeState, getEmailState } = require('./helper.js');

async function sendEmailToUser(user, isRaining) {
  // Simulate email sending logic
  try {
    const timeState = getTimeState(user);
    const emailState = getEmailState(timeState.user);
    if (timeState.timeExceeded && isRaining && emailState.hasNotExceeded) {
      user.numberOfReceivedEmails += 1;
      user.prevTimestamp = Date.now();
      console.log(
        `Sending email to ${user.name} (${user.email}) - It's raining`,
        user,
      );
    } else {
      console.log('Cannot send email at this time', user);
    }
  } catch (error) {
    console.error('Error message:', error.message);
  }
}

exports.sendEmailToUser = sendEmailToUser;
