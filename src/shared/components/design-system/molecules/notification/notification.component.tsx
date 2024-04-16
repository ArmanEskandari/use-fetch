import { Alert, Snackbar } from '@mui/material';
import { useNotificationStore } from '@store/notification';

const Notification = () => {
  const { message, type, hideNotification } = useNotificationStore();
  const handleClose = () => {
    hideNotification();
  };

  return message ? (
    <Snackbar
      open={!!message}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        elevation={6}
        variant="filled"
        severity={type || 'success'} // Use messageType or default to 'success'
        onClose={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>
  ) : (
    <></>
  );
};

export { Notification };
