import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ContactsIcon from "@mui/icons-material/Contacts";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from "@mui/icons-material/Person";

const RightSideBar = () => {
  return (
    <Grid
      xs={1}
      sx={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "70%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "56px",
            height: "56px",
            display: "flex",
            borderRadius: "10px",
            backgroundColor: "#7786F6",
            color: "#FFF",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <PersonIcon />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <HomeIcon
            sx={{
              width: "26px",
              height: "26px",
              cursor: "pointer",
              color: "#A9A9A9",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <QuestionAnswerIcon
            sx={{
              width: "26px",
              height: "26px",
              cursor: "pointer",
              color: "#A9A9A9",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <ContactsIcon
            sx={{
              width: "26px",
              height: "26px",
              cursor: "pointer",
              color: "#A9A9A9",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <SearchIcon
            sx={{
              width: "26px",
              height: "26px",
              cursor: "pointer",
              color: "#A9A9A9",
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "20%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SettingsIcon
            sx={{
              width: "26px",
              height: "26px",
              cursor: "pointer",
              color: "#A9A9A9",
            }}
          />
        </Box>
      </Box>
    </Grid>
  );
};

export default RightSideBar;
