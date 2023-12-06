// check if its a new day
export function checkNewDay(user) {
  if (user.prevTimestamp) {
    const currentDate = new Date();

    if (
      currentDate.getDate() !== user.prevTimestamp.getDate() ||
      currentDate.getMonth() !== user.prevTimestamp.getMonth() ||
      currentDate.getFullYear() !== user.prevTimestamp.getFullYear()
    ) {
      return true;
    } else {
      return false;
    }
  }
}

// check if user has received more than 3 emails
export function hasExceededEmails(user) {
  if (user.numberOfReceivedEmails >= 3) {
    return true;
  }

  return false;
}

// get user's state as concerning the number of emails received in a day
export function getEmailState(user, customers) {
  if (checkNewDay(user)) {
    customers[user.index].numberOfReceivedEmails = 0;
    return {
      user: customers[user.index],
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
export function getTimeState(user) {
  const currentTime = new Date();
  if (user.prevTimestamp) {
    const diffInMillisec = Math.abs(currentTime - user.prevTimestamp);
    const minuteDifference = Math.floor(diffInMillisec / (1000 * 60));

    if (minuteDifference < 30) {
      return { timeExceeded: false, user };
    }
  }
  return { timeExceeded: true, user };
}
