import { Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CardWrapper = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-evenly",
  flexDirection: "row",
  width: "100%",
}));

export const CardContainer = styled(Container)(({ theme }) => ({
  maxWidth: "400px !important",
  margin: "25px 0px",
}));

export const LabelContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

export const Label = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  color: "red",
  padding: "20px",
}));
