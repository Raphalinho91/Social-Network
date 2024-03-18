import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import MessageChat from "./messageChat";

interface barChatProps {
    userNameForConv: string;
  }

const barChat: React.FC<barChatProps> = ({ userNameForConv }) => {
  return (
    <Grid
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Box
            sx={{
              height: "56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              backgroundColor: "#7786F6",
              color: "#FFF",
              width: "9%",
              cursor: "pointer",
              ml: 3,
            }}
          >
            <PersonIcon />
          </Box>
          <Box
            sx={{
              height: "56px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              borderRadius: "10px",
              width: "74%",
              flexDirection: "column",
              ml: 3,
              mr: 3,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                fontWeight: "600",
                color: "#000",
                ml: 1,
              }}
            >
              {userNameForConv}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "13px",
                fontWeight: "400",
                color: "#000",
                ml: 1,
              }}
            >
              En ligne
            </Typography>
          </Box>
          <Box
            sx={{
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              backgroundColor: "#EFEFFE",
              width: "15%",
              cursor: "pointer",
              gap: 1,
              mr: 3,
            }}
          >
            <CallIcon sx={{ color: "#7786F6" }} />
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "13px",
                fontWeight: "400",
                color: "#7786F6",
              }}
            >
              Appel
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider
        orientation="horizontal"
        sx={{
          width: "100%",
          height: "2px",
          borderColor: "A1A1A1",
          mb: 1,
          mt: -1,
        }}
      />
      <MessageChat />
    </Grid>
  );
};

export default barChat;
