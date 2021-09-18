import { Chip, Card, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

export const GenreChip = styled(Chip)(({ theme }) => ({
  position: "absolute",
  right: "10px",
  top: "10px",
  backgroundColor: "rgb(255 255 255 / 40%);",
  borderRadius: "20px",
  padding: "5px",
  fontWeight: 700,
}));

export const RatingChip = styled(Chip)(({ theme }) => ({
  position: "absolute",
  left: "10px",
  top: "10px",
  backgroundColor: "rgb(255 255 255 / 40%);",
  borderRadius: "20px",
  padding: "5px",
  fontWeight: 700,
}));

export const CardItem = styled(Card)(({ theme }) => ({
  position: "relative",
}));

export const RatingWrapper = styled(Stack)(({ theme }) => ({
  position: "absolute",
  bottom: "10px",
  right: "10px",
}));
