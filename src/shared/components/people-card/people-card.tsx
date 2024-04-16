import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Button } from '@shared/components/design-system';
import { type FC } from 'react';

interface Props {
  character: Character;
}

const PeopleCard: FC<Props> = ({ character }) => {
  const { name } = character || {};
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={name}
        height="140"
        image="/static/images/star-wars-placeholder.webp"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export { PeopleCard };
