import Box from '@mui/material/Box';
import { type FC, type ReactNode } from 'react';

interface Props {
  className?: string;
  children: ReactNode;
  sx?: Record<string, unknown>;
}

const Main: FC<Props> = ({ sx, children, className, ...props }) => {
  return (
    <Box
      component="main"
      className={className}
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export { Main };
