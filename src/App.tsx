import { Box, CircularProgress } from '@mui/material';
import { Notification } from '@shared/components/design-system/molecules/notification';
import { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import ErrorBoundary from './shared/components/error-boundary.tsx';
import Router from './shared/routes';
import ThemeProvider from './theme';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense
            fallback={
              <Box
                sx={{
                  width: '100%',
                  height: '100vh',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <CircularProgress size={70} />
              </Box>
            }
          >
            <ThemeProvider>
              <Router />
              <Notification />
            </ThemeProvider>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
