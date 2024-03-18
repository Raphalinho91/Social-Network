import { Box, TextField } from "@mui/material";
import React from "react";

const messageChat = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "85%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "coulmn",
        }}
      >
        <Box
          sx={{
            width: "90%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          messageChat
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "15%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField placeholder="Ecris un message" />
      </Box>
    </Box>
  );
};

export default messageChat;
