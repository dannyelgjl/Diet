const notifee = {
  createChannel: jest.fn(async () => 'mock-channel'),
  displayNotification: jest.fn(async () => undefined),
  cancelNotification: jest.fn(async () => undefined),
  cancelAllNotifications: jest.fn(async () => undefined),
  getTriggerNotificationIds: jest.fn(async () => []),
  createTriggerNotification: jest.fn(async () => undefined),
};

export default notifee;

export const AndroidImportance = {
  DEFAULT: 3,
  HIGH: 4,
};

export const TriggerType = {
  TIMESTAMP: 0,
};

export type TimestampTrigger = any;
