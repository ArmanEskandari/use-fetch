import { Box, Container, Typography } from '@mui/material';
import { Button } from '@shared/components/design-system/atoms/button';
import { RouterLink } from '@shared/components/design-system/atoms/router-link';
import { HOME_PAGE } from '@shared/constants/routes.ts';
import { reload } from '@shared/utils/reload.ts';
import { Component, type PropsWithChildren } from 'react';

class ErrorBoundary extends Component<PropsWithChildren> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="xl">
          <Box
            sx={{
              width: '100%',
              height: '100vh',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Typography variant="h3">Something went wrong.</Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <Button variant="outlined" onClick={reload}>
                Reload the Page
              </Button>
              <RouterLink to={HOME_PAGE}>
                <Button variant="outlined">Back to Home</Button>
              </RouterLink>
            </Box>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
