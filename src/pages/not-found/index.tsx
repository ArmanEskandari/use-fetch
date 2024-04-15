import { Box, Typography } from '@mui/material';
import { type FC } from 'react';

const NotFoundPage: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h6">
        The page you’re looking for does not exist.
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
