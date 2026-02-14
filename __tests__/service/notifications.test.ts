jest.mock('@notifee/react-native', () => {
  const mockNotifee = {
    createChannel: jest.fn(),
    requestPermission: jest.fn(),
    displayNotification: jest.fn(),
    createTriggerNotification: jest.fn(),
    cancelNotification: jest.fn(),
  };

  return {
    __esModule: true,
    default: mockNotifee,
    AndroidImportance: { HIGH: 'HIGH' },
    TriggerType: { TIMESTAMP: 'TIMESTAMP' },
  };
});

function loadNotificationsModule() {
  jest.resetModules();
  return require('../../src/services/notifications') as typeof import('../../src/services/notifications');
}

function getNotifeeMock() {
  return require('@notifee/react-native').default as {
    createChannel: jest.Mock;
    requestPermission: jest.Mock;
    displayNotification: jest.Mock;
    createTriggerNotification: jest.Mock;
    cancelNotification: jest.Mock;
  };
}

describe('notifications service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('requestNotificationPermission() call requestPermission', async () => {
    const notifications = loadNotificationsModule();
    const notifee = getNotifeeMock();

    await notifications.requestNotificationPermission();

    expect(notifee.requestPermission).toHaveBeenCalledTimes(1);
  });

  it('notifyFastingStarted() create channel and show notification', async () => {
    const notifications = loadNotificationsModule();
    const notifee = getNotifeeMock();

    await notifications.notifyFastingStarted();

    expect(notifee.createChannel).toHaveBeenCalledTimes(1);
    expect(notifee.createChannel).toHaveBeenCalledWith({
      id: 'fasting',
      name: 'Fasting',
      importance: 'HIGH',
    });

    expect(notifee.displayNotification).toHaveBeenCalledTimes(1);
    expect(notifee.displayNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Jejum iniciado',
        body: 'Seu jejum começou. Boa!',
        android: expect.objectContaining({
          channelId: 'fasting',
          pressAction: { id: 'default' },
        }),
      }),
    );
  });

  it('scheduleFastingFinished() create trigger notification with timestamp', async () => {
    const notifications = loadNotificationsModule();
    const notifee = getNotifeeMock();

    const atMs = 1700000000000;
    const notificationId = 'fasting_end_123';

    await notifications.scheduleFastingFinished(atMs, notificationId);

    expect(notifee.createChannel).toHaveBeenCalledTimes(1);

    expect(notifee.createTriggerNotification).toHaveBeenCalledTimes(1);
    expect(notifee.createTriggerNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        id: notificationId,
        title: 'Jejum finalizado ✅',
        body: 'Parabéns! Seu período de jejum terminou.',
        android: expect.objectContaining({
          channelId: 'fasting',
          pressAction: { id: 'default' },
        }),
      }),
      { type: 'TIMESTAMP', timestamp: atMs },
    );
  });

  it('cancelScheduled() call cancelNotification and dont broken in erro', async () => {
    const notifications = loadNotificationsModule();
    const notifee = getNotifeeMock();

    await notifications.cancelScheduled('abc');
    expect(notifee.cancelNotification).toHaveBeenCalledWith('abc');

    notifee.cancelNotification.mockRejectedValueOnce(new Error('boom'));
    await expect(notifications.cancelScheduled('xyz')).resolves.toBeUndefined();
  });

  it('notifyFastingFinishedNow() show notification', async () => {
    const notifications = loadNotificationsModule();
    const notifee = getNotifeeMock();

    await notifications.notifyFastingFinishedNow();

    expect(notifee.createChannel).toHaveBeenCalledTimes(1);
    expect(notifee.displayNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Jejum encerrado',
        body: 'Jejum finalizado/encerrado com sucesso.',
        android: expect.objectContaining({
          channelId: 'fasting',
          pressAction: { id: 'default' },
        }),
      }),
    );
  });

  it('ensureChannel cache: create the channel only 1 time', async () => {
    const notifications = loadNotificationsModule();
    const notifee = getNotifeeMock();

    await notifications.notifyFastingStarted();
    await notifications.notifyFastingFinishedNow();

    expect(notifee.createChannel).toHaveBeenCalledTimes(1);
  });
});
