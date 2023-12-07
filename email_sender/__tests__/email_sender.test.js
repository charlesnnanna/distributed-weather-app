const { sendEmailToUser } = require('../email_sender');

const expect = require('chai').expect;

describe('Email Sender', () => {
  beforeEach(() => {});

  afterEach(async () => {
    // Close the connection and channel after each test
  });

  it("should send an email to a user when it's raining", async () => {
    const user = {
      index: 0,
      email: 'test@example.com',
      name: 'Test User',
      numberOfReceivedEmails: 0,
      prevTimestamp: 0,
    };

    await sendEmailToUser(user, true, [user]);
    // Add assertions or use mocks/stubs to check the email-sending behavior
    expect(user.numberOfReceivedEmails).to.equal(1);
  });

  it("should not send an email to a user when it's not raining", async () => {
    const user = {
      index: 0,
      email: 'test@example.com',
      name: 'Test User',
      numberOfReceivedEmails: 0,
      prevTimestamp: 0,
    };

    await sendEmailToUser(user, false);
    // Add assertions or use mocks/stubs to check the email-sending behavior
    expect(user.numberOfReceivedEmails).to.equal(0);
  });

  it('should not send more than 3 emails to a user per day', async () => {
    const user = {
      index: 0,
      email: 'test@example.com',
      name: 'Test User',
      numberOfReceivedEmails: 0,
      prevTimestamp: 0,
    };

    jest.useFakeTimers();

    for (let i = 0; i < 8; i++) {
      jest.advanceTimersByTime(1000 * 60 * 60);
      await sendEmailToUser(user, true);
    }

    jest.clearAllTimers();

    // Add assertions or use mocks/stubs to check the email-sending behavior
    expect(user.numberOfReceivedEmails).to.not.be.greaterThan(3);
  });

  it('should enforce a minimum spacing of 30 minutes between emails to a user', async () => {
    const user = {
      index: 0,
      email: 'test@example.com',
      name: 'Test User',
      numberOfReceivedEmails: 0,
      prevTimestamp: 0,
    };

    await sendEmailToUser(user, true);
    const firstTimestamp = user.prevTimestamp;

    // Simulate sending another email within 30 minutes
    await sendEmailToUser(user, true);
    const secondTimestamp = user.prevTimestamp;

    expect(secondTimestamp).to.equal(firstTimestamp);

    jest.useFakeTimers();
    jest.advanceTimersByTime(1000 * 60 * 60);
    await sendEmailToUser(user, true);
    const thirdTimestamp = user.prevTimestamp;

    jest.clearAllTimers();
    expect(thirdTimestamp - secondTimestamp).to.be.greaterThan(1000 * 60 * 60);
  });
});
