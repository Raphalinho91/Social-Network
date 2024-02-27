"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import * as style from "../../style/styleSignup";

const FirstPage = () => {
  return (
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
          ></Box>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: "80px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "38px",
              fontWeight: "900",
            }}
          >
            Bienvenu sur AppAll
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
              fontWeight: "600",
              mt: 6,
            }}
          >
            AppAll est une application qui répond à absolument tout vos besoins.
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
              fontWeight: "400",
              mt: 2,
            }}
          >
            - Communiquer avec vos amis
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
              fontWeight: "400",
              mt: 1,
            }}
          >
            - Partager avec vos amis
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
              fontWeight: "400",
              mt: 1,
            }}
          >
            - Echanger avec vos amis
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
              fontWeight: "400",
              mt: 1,
            }}
          >
            - Jouer avec vos amis
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
              fontWeight: "400",
              mt: 1,
            }}
          >
            - Plannifier avec vos amis
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
              fontWeight: "600",
              mt: 2,
            }}
          >
            Ne perdez pas plus de temps.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              mt: 6,
            }}
          >
            <style.BtnDefault>
              <Link
                href="/signup"
                style={{
                  textDecoration: "none",
                  listStyle: "none",
                  color: "#FFF",
                }}
              >
                Incrisvez-vous
              </Link>
            </style.BtnDefault>
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              ou
            </Typography>
            <style.BtnDefault>
              <Link
                href="/login"
                style={{
                  textDecoration: "none",
                  listStyle: "none",
                  color: "#FFF",
                }}
              >
                Connectez-vous
              </Link>
            </style.BtnDefault>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FirstPage;
