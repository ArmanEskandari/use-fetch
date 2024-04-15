import { Layout } from '@layouts/container';
import { Box, CircularProgress } from '@mui/material';
import { NOT_FOUND_PAGE } from '@shared/constants/routes.ts';
import { type FC, lazy, Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const IndexPage = lazy(() => import('@pages/index'));
const NotFoundPage = lazy(() => import('@pages/not-found'));

const RoutesComponent: FC = () => {
  const routes = useRoutes([
    {
      element: (
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
          <Layout>
            <Outlet />
          </Layout>
        </Suspense>
      ),
      children: [
        {
          element: <IndexPage />,
          index: true,
        },
      ],
    },
    {
      path: NOT_FOUND_PAGE,
      element: <NotFoundPage />,
    },
    {
      path: '*',
      element: <Navigate to={NOT_FOUND_PAGE} replace />,
    },
  ]);

  return routes;
};

export default RoutesComponent;
