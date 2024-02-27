"use client";

import {
  Alert,
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import * as style from "../../style/styleSignup";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ConnectionPage = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setOpen(false);

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        userName,
        password,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        setMessage(response.data.message);
        console.log("Token:", token);
      } else {
        setError("No token received from server");
      }
      setOpen(true);
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || "Something went wrong");
      } else if (err.request) {
        setError("No response from the server");
      } else {
        setError("Error");
      }
      setOpen(true);
    }
  };

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
                width: "100%",
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
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <form onSubmit={handleSubmit}>
                <TextField
                  type="text"
                  id="userName"
                  placeholder="Nom d'utilisateur"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  sx={{
                    display: "flex",
                    width: "100%",
                  }}
                />
                <TextField
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ display: "flex", width: "100%", mt: 3 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <style.BoxCenter>
                  <style.BtnDefault type="submit" sx={{ width: "50%" }}>
                    Connection
                  </style.BtnDefault>
                </style.BoxCenter>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity={error ? "error" : "success"}
                    sx={{ width: "100%" }}
                  >
                    {error || message}
                  </Alert>
                </Snackbar>
              </form>
              <style.BoxCenter>
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Vous avez oubliez votre mot de passe ?{" "}
                  <Link
                    href="/"
                    style={{
                      textDecoration: "none",
                      listStyle: "none",
                      color: "#7786F6",
                    }}
                  >
                    Renitialisez le
                  </Link>
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: "600",
                    mt: 1,
                  }}
                >
                  Vous n&#39;avez pas créé de compte ?{" "}
                  <Link
                    href="/signup"
                    style={{
                      textDecoration: "none",
                      listStyle: "none",
                      color: "#7786F6",
                    }}
                  >
                    Inscrivez-vous
                  </Link>
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: "600",
                    mt: 1,
                  }}
                >
                  Retournez à{" "}
                  <Link
                    href="/"
                    style={{
                      textDecoration: "none",
                      listStyle: "none",
                      color: "#7786F6",
                    }}
                  >
                    l&#39;accueil
                  </Link>
                </Typography>
              </style.BoxCenter>
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
