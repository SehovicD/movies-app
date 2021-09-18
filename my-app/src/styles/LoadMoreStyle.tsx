import { Button, Container } from "@mui/material";
import { red, grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export const LoadMoreButton = styled(Button)(({ theme }) => ({
  maxWidth: "400px !important",
  margin: "25px 0px",
  backgroundColor: "red",
  color: "#fff",
  "&:hover": {
    backgroundColor: red[100],
    color: grey[900],
  },
}));

export const LoadMoreButtonWrapper = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));
