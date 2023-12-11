// check if its a new day
function checkNewDay(user) {
  if (user.prevTimestamp) {
    const currentDate = new Date();
    const date = new Date(user.prevTimestamp);

    console.log(date);

    if (
      currentDate.getDate() !== date.getDate() ||
      currentDate.getMonth() !== date.getMonth() ||
      currentDate.getFullYear() !== date.getFullYear()
    ) {
      return true;
    } else {
      return false;
    }
  }
}

// check if user has received more than 3 emails
function hasExceededEmails(user) {
  if (user.numberOfReceivedEmails >= 3) {
    return true;
  }

  return false;
}

// get user's state as concerning the number of emails received in a day
function getEmailState(user) {
  if (checkNewDay(user)) {
    user.numberOfReceivedEmails = 0;
    return {
      user: user,
      hasNotExceeded: true,
    };
  } else {
    const hasExceeded = hasExceededEmails(user);
    if (hasExceeded) {
      return {
        user: user,
        hasNotExceeded: false,
      };
    }

    return {
      user: user,
      hasNotExceeded: true,
    };
  }
}

// get users' time state as concerning the amount of time passed since the last email
function getTimeState(user) {
  const currentTime = Date.now();
  if (user.prevTimestamp) {
    const diffInMillisec = Math.abs(currentTime - user.prevTimestamp);
    const minuteDifference = Math.floor(diffInMillisec / (1000 * 60));

    if (minuteDifference < 30) {
      return { timeExceeded: false, user };
    }
  }
  // user.prevTimestamp = currentTime;
  return { timeExceeded: true, user };
}

module.exports = {
  getEmailState,
  getTimeState,
  checkNewDay,
  hasExceededEmails,
};
