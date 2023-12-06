export const customers = [
  {
    index: 0,
    email: 'customer1@example.com',
    name: 'Customer 1',
    numberOfReceivedEmails: 0,
    prevTimestamp: 0,
  },
  {
    index: 1,
    email: 'customer2@example.com',
    name: 'Customer 2',
    numberOfReceivedEmails: 0,
    prevTimestamp: 0,
  },
  {
    index: 2,
    email: 'customer3@example.com',
    name: 'Customer 3',
    numberOfReceivedEmails: 0,
    prevTimestamp: 0,
  },
  {
    index: 3,
    email: 'customer4@example.com',
    name: 'Customer 4',
    numberOfReceivedEmails: 0,
    prevTimestamp: 0,
  },
];

export const weatherData = {
  current: {
    condition: 'rain',
  },
};

export const weatherCache = {
  data: null,
  timestamp: 0,
  expiration: 10 * 60 * 1000, // Cache expires after 10 minutes
};
