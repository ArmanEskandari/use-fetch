declare namespace Notification {
  interface NotificationState {
    message: string | null;
    type: 'success' | 'error' | 'warning' | 'info' | null;
  }

  interface NotificationActions {
    showNotification: (
      message: string,
      type?: 'success' | 'error' | 'warning' | 'info',
    ) => void;
    hideNotification: () => void;
  }
}
