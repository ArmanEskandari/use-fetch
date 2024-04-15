import { Container, Paper, Stack, Typography } from '@mui/material';
import { getApiStarWarsPeople } from '@shared/api/get-api-star-wars-people.ts';
import { Button } from '@shared/components/design-system/atoms/button';
import { PeopleCard } from '@shared/components/people-card';
import { useFetch } from '@shared/hooks/use-fetch.ts';
import { useNotificationStore } from '@store/notification';
import { type FC } from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  className?: string;
}

const AppPage: FC<Props> = ({ className }) => {
  const { showNotification } = useNotificationStore();
  const { loading, data, error, fetchData } = useFetch({
    fireOnload: false,
    apiRequest: getApiStarWarsPeople,
    onSuccess: () => {
      showNotification('Success!');
    },
  });

  const fetchFalsy = () => {
    fetchData(true);
  };

  const fetchTruthy = () => {
    fetchData();
  };

  return (
    <>
      <Helmet>
        <title>use-fetch</title>
      </Helmet>

      <Container maxWidth="xl" className={className}>
        <Paper sx={{ p: 2 }}>
          <Typography
            variant="h4"
            sx={{ mb: 5, display: 'flex', justifyContent: 'center' }}
          >
            use fetch hook representation
          </Typography>
          <Stack
            justifyContent="center"
            alignItems="center"
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Button
              variant="contained"
              isLoading={loading}
              onClick={fetchTruthy}
            >
              Fetch People
            </Button>
            <Button
              variant="contained"
              color="error"
              isLoading={loading}
              onClick={fetchFalsy}
            >
              Fetch People with Error
            </Button>
          </Stack>
          <Stack
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            direction={{ xs: 'column', sm: 'row' }}
            gap={2}
            my={2}
            px={2}
          >
            {error ? (
              <Typography m={2} variant="h3">
                {error.message}
              </Typography>
            ) : (
              <>
                {data?.map((character) => <PeopleCard character={character} />)}
              </>
            )}
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default AppPage;
