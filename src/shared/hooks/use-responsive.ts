import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Breakpoint } from '@mui/system';

interface Props {
  query: 'up' | 'down' | 'between' | 'only';
  start: Breakpoint;
  end?: Breakpoint;
}

function useResponsive({ query, start, end }: Props) {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start));
  const mediaDown = useMediaQuery(theme.breakpoints.down(start));
  const mediaBetween = useMediaQuery(
    theme.breakpoints.between(start, end || start),
  ); // Use start if end is not provided
  const mediaOnly = useMediaQuery(theme.breakpoints.only(start));

  let result;

  switch (query) {
    case 'up':
      result = mediaUp;
      break;
    case 'down':
      result = mediaDown;
      break;
    case 'between':
      result = mediaBetween;
      break;
    case 'only':
      result = mediaOnly;
      break;
    default:
      result = false;
      break;
  }

  return result;
}

export { useResponsive };
