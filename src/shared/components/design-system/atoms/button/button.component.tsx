import { Button, CircularProgress } from '@mui/material';
import { type ComponentProps } from 'react';

interface Props extends ComponentProps<typeof Button> {
  isLoading?: boolean;
}

const BaseButton = ({ isLoading, ...props }: Props) => {
  return (
    <Button {...props}>
      {isLoading ? <CircularProgress size={25} color="info" /> : props.children}
    </Button>
  );
};

export { BaseButton as Button };
