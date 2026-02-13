import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

const CHANNEL_ID = 'fasting';

let channelReady = false;

async function ensureChannel() {
  if (channelReady) return;

  await notifee.createChannel({
    id: CHANNEL_ID,
    name: 'Fasting',
    importance: AndroidImportance.HIGH,
  });

  channelReady = true;
}

export async function requestNotificationPermission() {
  await notifee.requestPermission();
}

export async function notifyFastingStarted() {
  await ensureChannel();

  await notifee.displayNotification({
    title: 'Jejum iniciado',
    body: 'Seu jejum começou. Boa!',
    android: {
      channelId: CHANNEL_ID,
      pressAction: { id: 'default' },
    },
  });
}

export async function scheduleFastingFinished(
  atMs: number,
  notificationId: string,
) {
  await ensureChannel();

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: atMs,
  };

  await notifee.createTriggerNotification(
    {
      id: notificationId,
      title: 'Jejum finalizado ✅',
      body: 'Parabéns! Seu período de jejum terminou.',
      android: {
        channelId: CHANNEL_ID,
        pressAction: { id: 'default' },
      },
    },
    trigger,
  );
}

export async function cancelScheduled(notificationId: string) {
  try {
    await notifee.cancelNotification(notificationId);
  } catch {}
}

export async function notifyFastingFinishedNow() {
  await ensureChannel();

  await notifee.displayNotification({
    title: 'Jejum encerrado',
    body: 'Jejum finalizado/encerrado com sucesso.',
    android: {
      channelId: CHANNEL_ID,
      pressAction: { id: 'default' },
    },
  });
}
