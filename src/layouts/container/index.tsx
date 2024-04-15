import Box from '@mui/material/Box';
import { type FC, type ReactNode } from 'react';

import { Main } from './components/main.tsx';

interface Props {
  className?: string;
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }: Props) => {
  return (
    <Box
      sx={{
        minHeight: 1,
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
      }}
    >
      <Main>{children}</Main>
    </Box>
  );
};

export { Layout };
