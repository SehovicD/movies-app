import { CardContent, CardMedia, Rating, Typography } from "@mui/material";
import {
  RatingChip,
  GenreChip,
  CardItem,
  RatingWrapper,
} from "../styles/MovieCardStyle";

interface MovieCardProps {
  item: any;
}

const MovieCard = (props: MovieCardProps) => {
  const { item } = props;
  return (
    <CardItem key={item.id} sx={{ maxWidth: 345, height: 320 }}>
      <CardMedia
        component="img"
        height="140"
        image={item.image}
        alt="green iguana"
      />
      <RatingChip label={item.rating} />
      <GenreChip label={item.genres} />
      <CardContent>
        <Typography gutterBottom variant="subtitle1" component="div">
          {item.title} ({item.release_year})
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          Lead actors:
          <div>
            {item?.actors.map((item: any, index: number) => {
              return <label key={`actor-${index}`}>{item}, </label>;
            })}
          </div>
        </Typography>
        <RatingWrapper>
          <Rating name="size-small" precision={0.5} />
        </RatingWrapper>
      </CardContent>
    </CardItem>
  );
};

export default MovieCard;
