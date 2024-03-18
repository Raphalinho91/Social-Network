"use client";

import React, { useEffect, useState } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import RightSideBar from "../components/sidebar/RightSideBar";
import ConversationPage from "../components/conversation/conversation";
import ChatPage from "../components/chat/barChat";

const MessagePage = () => {
  const [userNameForConv, setUserNameForConv] = useState("");

  const handleSelectFriend = (userName: string) => {
    setUserNameForConv(userName);
  };

  console.log(userNameForConv);

  return (
    <Grid
      xs={12}
      container
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "97.5vh",
        width: "100%",
      }}
    >
      <Grid
        item
        xs={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          backgroundColor: "#FFF",
        }}
      >
        <RightSideBar />
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          backgroundColor: "#FFF",
        }}
      >
        <ConversationPage onSelectFriend={handleSelectFriend} />
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          backgroundColor: "#FFF",
        }}
      >
        <Divider
          orientation="vertical"
          sx={{
            width: "2px",
            height: "100%",
            borderColor: "A1A1A1",
          }}
        />
        {userNameForConv ? (
          <ChatPage userNameForConv={userNameForConv} />
        ) : (
          <Grid
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                marginTop: 2,
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                fontWeight: "600",
                color: "#000",
                textAlign: "center",
              }}
            >
              Cliquez sur une conversation
            </Typography>
          </Grid>
        )}
      </Grid>

      <Grid
        item
        xs={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          backgroundColor: "violet",
        }}
      ></Grid>
    </Grid>
  );
};

export default MessagePage;
