import { type ComponentProps, forwardRef, type Ref } from 'react';
import { Link } from 'react-router-dom';

interface Props extends ComponentProps<typeof Link> {
  className?: string;
}

const RouterLink = forwardRef(
  ({ className, ...props }: Props, ref: Ref<HTMLAnchorElement>) => (
    <Link
      style={{ width: 'fit-content' }}
      ref={ref}
      className={className}
      {...props}
    />
  ),
);

export { RouterLink };
