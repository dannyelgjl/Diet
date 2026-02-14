require('@testing-library/jest-native/extend-expect');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('@notifee/react-native', () => ({
  __esModule: true,
  default: {
    createChannel: jest.fn(async () => 'mock-channel'),
    createTriggerNotification: jest.fn(async () => undefined),
    cancelNotification: jest.fn(async () => undefined),
    cancelAllNotifications: jest.fn(async () => undefined),
  },
  AndroidImportance: { HIGH: 4 },
  TriggerType: { TIMESTAMP: 0 },
}));
