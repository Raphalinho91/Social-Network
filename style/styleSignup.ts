import { Box, Button, styled } from "@mui/material";

export const BtnDefault = styled(Button)({
  backgroundColor: "#7786F6",
  color: "#FFF",
  borderRadius: "4px",
  padding: "5px",
  "&:hover": {
    backgroundColor: "#7786F6",
    color: "#FFF",
  },
});

export const TabMenuBox = styled(Box)({
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#7786F6",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
});

export const BoxCenter = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "60px",
});
