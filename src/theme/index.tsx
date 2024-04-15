import CssBaseline from '@mui/material/CssBaseline';
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import { ReactNode, useMemo } from 'react';

import { overrides } from './overrides';
import { palette } from './palette';
import { typography } from './typography';

interface Props {
  children: ReactNode;
}
export default function ThemeProvider({ children }: Props) {
  const memoizedValue = useMemo(
    () => ({
      palette: palette(),
      typography,
      shape: { borderRadius: 8 },
    }),
    [],
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
