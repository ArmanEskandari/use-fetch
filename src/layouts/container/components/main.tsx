import Box from '@mui/material/Box';
import { useResponsive } from '@shared/hooks/use-responsive.ts';
import { type FC, type ReactNode } from 'react';

import { HEADER, NAV } from '../config/config-layout.ts';

interface Props {
  className?: string;
  children: ReactNode;
  sx?: Record<string, unknown>;
}

const SPACING = 8;

const Main: FC<Props> = ({ sx, children, className, ...props }) => {
  const lgUp = useResponsive({ query: 'up', start: 'lg' });
  return (
    <Box
      component="main"
      className={className}
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export { Main };
