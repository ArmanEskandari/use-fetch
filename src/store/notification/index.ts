import { create } from 'zustand';

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

const useNotificationStore = create<NotificationState & NotificationActions>(
  (set) => ({
    message: null,
    type: null,
    showNotification: (message, type = 'success') => set({ message, type }),
    hideNotification: () => set({ message: null, type: null }),
  }),
);

export { useNotificationStore };
