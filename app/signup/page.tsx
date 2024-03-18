"use client";

import {
  Box,
  Container,
  Grid,
  Tab,
  Tabs,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import TabPanel from "../components/register/TabPlanel";
import NameUser from "../components/register/NameUser";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import EmailAndPhone from "../components/register/EmailAndPhone";
import PasswordPlanel from "../components/register/PasswordPlanel";
import * as style from "../../style/styleSignup";
import { Dayjs } from "dayjs";
import Link from "next/link";
import SignupSuccessPlanel from "../components/register/SignupSuccessPlanel";
import SendVerifyEmailOrPhone from "../components/register/SendVerifyPlanel";
import OtpInput from "../components/register/OtpInputPlanel";

const InscriptionPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState<Dayjs | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedValueRadio, setSelectedValueRadio] = useState("");
  const [otpValue, setOtpValue] = useState("");

  const handleChangeRadio = (event) => {
    setSelectedValueRadio(event.target.value);
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [value, setValue] = React.useState(0);

  const handleComplete = (otp: any) => {
    setOtpValue(otp);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const goToPreviousTab = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "userName":
        setUserName(value);
        break;
      case "dateOfBirth":
        setDateOfBirth(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleNextTab = () => {
    let canProceed: boolean = false;
    switch (value) {
      case 0:
        canProceed =
          !!firstName.trim() && !!lastName.trim() && !!userName.trim();
        break;
      case 1:
        canProceed = dateOfBirth !== null;
        break;
      case 2:
        canProceed = !!email.trim() && !!phoneNumber.trim();
        break;
      case 3:
        canProceed = true;
        break;
      case 4:
        canProceed = true;
        break;
      case 5:
        canProceed = true;
        break;
      case 6:
        canProceed = !!password.trim() && password === confirmPassword;
        break;
      default:
        canProceed = false;
        break;
    }

    if (!canProceed) {
      alert("Veuillez remplir tous les champs requis avant de continuer.");
      return;
    } else {
      setValue((prevValue) => Math.min(prevValue + 1, 7));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }
    if (
      !firstName ||
      !lastName ||
      !userName ||
      !dateOfBirth ||
      !phoneNumber ||
      !email ||
      !password
    ) {
      setError("Veuillez remplir tous les champs.");
      setLoading(false);
      return;
    }

    const user = {
      firstName,
      lastName,
      userName,
      dateOfBirth,
      phoneNumber,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/signup",
        user
      );
      setLoading(false);
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setDateOfBirth(null);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setSuccess("Utilisateur créé avec succès !");
      setValue((prevValue) => Math.min(prevValue + 1, 7));
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || "Une erreur inconnue s'est produite.");
      } else {
        setError("Une erreur inconnue s'est produite.");
      }
    }
  };

  const [loadingSendEmail, setLoadingSendEmail] = useState(false);
  const [errorSendEmail, setErrorSendEmail] = useState("");
  const [successSendEmail, setSuccessSendEmail] = useState("");

  const handleSubmitSendEmail = async () => {
    setLoadingSendEmail(true);
    setErrorSendEmail("");
    setSuccessSendEmail("");
  
    if (!email && selectedValueRadio === "email") {
      setErrorSendEmail("Veuillez renseigner votre adresse email.");
      setLoadingSendEmail(false);
      return;
    } 
    let url = "";
    let data = {};
    let successMessage = "";
  
    if (selectedValueRadio === "email") {
      url = "http://localhost:3000/api/sendEmailCode";
      data = { email };
      successMessage = "Email envoyé avec succès !";
    } 
  
    try {
      const response = await axios.post(url, data);
      setSuccessSendEmail(successMessage);
      setValue((prevValue) => Math.min(prevValue + 1, 7));
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

    if (!email) {
      setErrorSendEmail("Veuillez renseigner votre adresse email.");
      setLoadingSendEmail(false);
      return;
    }
    if (!otpValue) {
      setErrorSendEmail("Veuillez entrer le code reçu.");
      setLoadingSendEmail(false);
      return;
    }

    if (selectedValueRadio === "email") {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/verifyEmailCode",
          { email, code: otpValue }
        );

        const messageFromServer = "Email vérifié avec succès !";
        setSuccessSendEmail(messageFromServer);
        setValue((prevValue) => Math.min(prevValue + 1, 7));
      } catch (error) {
        setLoadingSendEmail(false);
        if (axios.isAxiosError(error) && error.response) {
          setErrorSendEmail("Une erreur inconnue s'est produite.");
        } else {
          setErrorSendEmail("Une erreur inconnue s'est produite.");
        }
      }
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
            justifyContent: {
              lg: "flex-start",
              md: "flex-start",
              sm: "center",
              xs: "center",
            },
            alignItems: "flex-start",
            borderRadius: "20px",
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
          }}
        >
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
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "38px",
                fontWeight: "900",
                textAlign: "center",
                mt: 2,
              }}
            >
              Inscription
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Box
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  mt: 2,
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChangeTab}
                  textColor="inherit"
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    display: "flex",
                    width: "100%",
                    ".MuiTabs-indicator": {
                      display: "none",
                    },
                  }}
                >
                  <Tab
                    label={<style.TabMenuBox>1</style.TabMenuBox>}
                    value={0}
                  />
                  <Tab
                    label={<style.TabMenuBox>2</style.TabMenuBox>}
                    value={1}
                  />
                  <Tab
                    label={<style.TabMenuBox>3</style.TabMenuBox>}
                    value={2}
                  />
                  <Tab
                    label={<style.TabMenuBox>4</style.TabMenuBox>}
                    value={3}
                  />
                  <Tab
                    label={<style.TabMenuBox>5</style.TabMenuBox>}
                    value={4}
                  />
                  <Tab
                    label={<style.TabMenuBox>6</style.TabMenuBox>}
                    value={5}
                  />
                  <Tab
                    label={<style.TabMenuBox>7</style.TabMenuBox>}
                    value={6}
                  />
                  <Tab
                    label={<style.TabMenuBox>8</style.TabMenuBox>}
                    value={7}
                  />
                </Tabs>
              </Box>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  mt: 2,
                }}
              >
                <TabPanel value={value} index={0}>
                  <NameUser
                    firstName={firstName}
                    lastName={lastName}
                    userName={userName}
                    onChange={handleChange}
                  />
                  <style.BoxCenter sx={{ mt: 5 }}>
                    <style.BtnDefault
                      onClick={handleNextTab}
                      sx={{ width: "50%" }}
                    >
                      Suivant
                    </style.BtnDefault>
                  </style.BoxCenter>
                  <style.BoxCenter sx={{ mt: 3 }}>
                    <Typography
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "14px",
                        fontWeight: "600",
                        mt: 1,
                      }}
                    >
                      Vous avez déjà un compte ?{" "}
                      <Link
                        href="/login"
                        style={{
                          textDecoration: "none",
                          listStyle: "none",
                          color: "#7786F6",
                        }}
                      >
                        Connectez-vous
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
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateField"]}>
                      <DateField
                        label="Date de naissance"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        format="DD/MM/YYYY"
                        onChange={(newDate) => setDateOfBirth(newDate)}
                        sx={{
                          display: "flex",
                          width: "100%",
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 6,
                    }}
                  >
                    <style.BtnDefault
                      onClick={goToPreviousTab}
                      sx={{ width: "40%" }}
                    >
                      Précèdent
                    </style.BtnDefault>
                    <style.BtnDefault
                      onClick={handleNextTab}
                      sx={{ width: "40%" }}
                    >
                      Suivant
                    </style.BtnDefault>
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <EmailAndPhone
                    email={email}
                    phoneNumber={phoneNumber}
                    onChange={handleChange}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 6,
                    }}
                  >
                    <style.BtnDefault
                      onClick={goToPreviousTab}
                      sx={{ width: "40%" }}
                    >
                      Précèdent
                    </style.BtnDefault>
                    <style.BtnDefault
                      onClick={handleNextTab}
                      sx={{ width: "40%" }}
                    >
                      Suivant
                    </style.BtnDefault>
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <SendVerifyEmailOrPhone
                    email={email}
                    selectedValueRadio={selectedValueRadio}
                    handleChangeRadio={handleChangeRadio}
                    handleSubmitSendEmail={handleSubmitSendEmail}
                  />
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <OtpInput
                    length={6}
                    onComplete={handleComplete}
                    handleSubmitVerifyEmail={handleSubmitVerifyEmail}
                    handleSubmitSendEmail={handleSubmitSendEmail}
                  />
                </TabPanel>
                <TabPanel value={value} index={5}>
                  <style.BoxCenter>
                    <Typography
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "20px",
                        fontWeight: "600",
                        mt: 1,
                      }}
                    >
                      Super, votre compte a été vérifié !
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "14px",
                        fontWeight: "400",
                        mt: 1,
                      }}
                    >
                      Il ne vous reste qu&#39;une étape, créer votre mot de
                      passe.
                    </Typography>
                    <style.BoxCenter>
                      <style.BtnDefault
                        sx={{ width: "110%" }}
                        onClick={handleNextTab}
                      >
                        Créer mon mot de passe
                      </style.BtnDefault>
                    </style.BoxCenter>
                  </style.BoxCenter>
                </TabPanel>
                <TabPanel value={value} index={6}>
                  <PasswordPlanel
                    password={password}
                    confirmPassword={confirmPassword}
                    onChange={handleChange}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 6,
                    }}
                  >
                    <style.BtnDefault
                      onClick={goToPreviousTab}
                      sx={{ width: "40%" }}
                    >
                      Précèdent
                    </style.BtnDefault>
                    <style.BtnDefault
                      type="submit"
                      disabled={loading}
                      sx={{ width: "40%" }}
                    >
                      {loading ? "Chargement..." : "Inscription"}
                    </style.BtnDefault>
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={7}>
                  <SignupSuccessPlanel userName={userName} />
                </TabPanel>
              </Grid>
              <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError("")}
              >
                <Alert
                  onClose={() => setError("")}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  {error}
                </Alert>
              </Snackbar>

              <Snackbar
                open={!!success}
                autoHideDuration={6000}
                onClose={() => setSuccess("")}
              >
                <Alert
                  onClose={() => setSuccess("")}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  {success}
                </Alert>
              </Snackbar>
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
            </form>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default InscriptionPage;
