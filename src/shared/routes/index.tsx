import { type FC, lazy } from 'react';

const RoutesComponent = lazy(() => import('./routes-component.tsx'));

const Router: FC = () => {
  return <RoutesComponent />;
};

export default Router;
