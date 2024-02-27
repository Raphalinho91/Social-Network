"use client";

import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

const ConnectionPage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "35px",
        height: "90vh",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Grid
          container
          xs={12}
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            borderRadius: "20px",
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
          }}
        >
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              padding: "80px",
              width: "100%",
              height: "100%",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "90%",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "38px",
                  fontWeight: "900",
                }}
              >
                Connection
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#7786F6",
                borderRadius: "20px",
                width: "100%",
                height: "100%",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ConnectionPage;
