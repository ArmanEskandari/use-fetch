import { create } from 'zustand';

const useNotificationStore = create<
  Notification.NotificationState & Notification.NotificationActions
>((set) => ({
  message: null,
  type: null,
  showNotification: (message, type = 'success') => set({ message, type }),
  hideNotification: () => set({ message: null, type: null }),
}));

export { useNotificationStore };
