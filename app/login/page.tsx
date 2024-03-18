"use client";

import {
  Alert,
  Box,
  Container,
  Grid,
  Snackbar,
  Tab,
  Tabs,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import TabPanel from "../components/register/TabPlanel";
import LoginPlanel from "../components/register/LoginPlanel";
import OtpInput from "../components/register/OtpInputPlanel";
import EmailForChangePass from "../components/register/EmailForChangePass";
import UpdatePassPlanel from "../components/register/UpdatePassPlanel";
import { useRouter } from 'next/navigation';

const ConnectionPage = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState(0);
  const [otpValue, setOtpValue] = useState("");
  const router = useRouter();

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleComplete = (otp: any) => {
    console.log("OTP Complet:", otp);
    setOtpValue(otp);
  };

  const handleNextTab = () => {
    setValue((prevValue) => Math.min(prevValue + 1, 4));
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
        localStorage.removeItem("token");
        localStorage.setItem("token", token);
        setMessage(response.data.message);
        router.push('/message');
      } else {
        setError("Le token de d'authorisation n'a pas été envoyé par le serveur.");
      }
      setOpen(true);
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || "La connection n'a pas fonctionné.");
      } else if (err.request) {
        setError("Une erreur inconnu s'est prduite.");
      } else {
        setError("Erreur");
      }
      setOpen(true);
    }
  };

  const [loadingSendEmail, setLoadingSendEmail] = useState(false);
  const [errorSendEmail, setErrorSendEmail] = useState("");
  const [successSendEmail, setSuccessSendEmail] = useState("");

  const handleSubmitSendEmail = async () => {
    setLoadingSendEmail(true);
    setErrorSendEmail("");
    setSuccessSendEmail("");

    if (!email) {
      setErrorSendEmail("Veuillez renseigner votre adresse email.");
      setLoadingSendEmail(false);
      return;
    }
    let url = "";
    let data = {};
    let successMessage = "";

    if (email) {
      url = "http://localhost:3000/api/sendEmailCode";
      data = { email };
      successMessage = "Email envoyé avec succès !";
    }

    try {
      const response = await axios.post(url, data);
      setSuccessSendEmail(successMessage);
      setValue((prevValue) => Math.min(prevValue + 1, 4));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorSendEmail(
          error.response.data.message || "Une erreur inconnue s'est produite."
        );
      } else {
        setErrorSendEmail("Une erreur inconnue s'est produite.");
      }
    } finally {
      setLoadingSendEmail(false);
    }
  };

  const handleSubmitVerifyEmail = async () => {
    setLoadingSendEmail(true);
    setErrorSendEmail("");
    setSuccessSendEmail("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/verifyCodeForMdp",
        {
          email,
          otp: otpValue,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setSuccessSendEmail(response.data.message);
        setValue((prevValue) => Math.min(prevValue + 1, 4));
      } else {
        setErrorSendEmail("Le token de d'authorisation n'a pas été envoyé par le serveur.");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorSendEmail(
          error.response.data.error || "La vérifiction du code n'a pas fonctionné."
        );
      } else {
        setErrorSendEmail("Une erreur inconnue s'est produite.");
      }
    } finally {
      setLoadingSendEmail(false);
    }
  };

  const handleSubmitUpdatePassword = async () => {
    setLoadingSendEmail(true);
    setErrorSendEmail("");
    setSuccessSendEmail("");

    if (!newPassword && !confirmNewPassword) {
      setErrorSendEmail("Remplissez tous les champs !");
      setLoadingSendEmail(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorSendEmail("Les mots de passes ne correspondent pas !");
      setLoadingSendEmail(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorSendEmail(
          "Le token d'authentification est manquant. Veuillez re-essayer !"
        );
        setLoadingSendEmail(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/updatePassword",
        {
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message) {
        setSuccessSendEmail(response.data.message);
        setPassword("");
        setValue(0); 
      } else {
        setErrorSendEmail("Le message de succès n'a pas été envoyé du serveur.");
      }
    } catch (error: any) {
      if (error.response) {
        setErrorSendEmail(
          error.response.data.error ||
            "Le changement de mot passe n'a pas fonctionné."
        );
      } else {
        setErrorSendEmail("Une erreur inconnu s'est produite.");
      }
    } finally {
      setLoadingSendEmail(false);
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
          width: "100%",
        }}
      >
        <Grid
          container
          xs={12}
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "20px",
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
          }}
        >
          <Grid
            item
            md={6}
            lg={6}
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              padding: "40px",
              width: "100%",
              flexDirection: "column",
            }}
          >
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
              <Box
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChangeTab}
                  textColor="inherit"
                  sx={{
                    display: "flex",
                    width: "100%",
                    ".MuiTabs-indicator": {
                      display: "none",
                    },
                  }}
                >
                  <Tab value={0} sx={{ display: "none" }} />
                  <Tab value={1} sx={{ display: "none" }} />
                  <Tab value={2} sx={{ display: "none" }} />
                  <Tab value={3} sx={{ display: "none" }} />
                </Tabs>
              </Box>
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <TabPanel value={value} index={0}>
                  <LoginPlanel
                    userName={userName}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    handleNextTab={handleNextTab}
                    handleSubmit={handleSubmit}
                  />
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
                </TabPanel>
              </form>
              <TabPanel value={value} index={1}>
                <EmailForChangePass
                  email={email}
                  setEmail={setEmail}
                  handleSubmitSendEmail={handleSubmitSendEmail}
                />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <OtpInput
                  length={6}
                  onComplete={handleComplete}
                  handleSubmitVerifyEmail={handleSubmitVerifyEmail}
                  handleSubmitSendEmail={handleSubmitSendEmail}
                />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <UpdatePassPlanel
                  newPassword={newPassword}
                  setNewPassword={setNewPassword}
                  confirmNewPassword={confirmNewPassword}
                  setConfirmNewPassword={setConfirmNewPassword}
                  handleSubmitUpdatePassword={handleSubmitUpdatePassword}
                />
              </TabPanel>
            </Grid>
            <Snackbar
              open={!!errorSendEmail}
              autoHideDuration={6000}
              onClose={() => setErrorSendEmail("")}
            >
              <Alert
                onClose={() => setErrorSendEmail("")}
                severity="error"
                sx={{ width: "100%" }}
              >
                {errorSendEmail}
              </Alert>
            </Snackbar>

            <Snackbar
              open={!!successSendEmail}
              autoHideDuration={6000}
              onClose={() => setSuccessSendEmail("")}
            >
              <Alert
                onClose={() => setSuccessSendEmail("")}
                severity="success"
                sx={{ width: "100%" }}
              >
                {successSendEmail}
              </Alert>
            </Snackbar>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
              padding: "40px",
              width: "100%",
              height: "100%",
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
