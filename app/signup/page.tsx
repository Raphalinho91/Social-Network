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
import TabPanel from "../components/TabPlanel";
import NameUser from "../components/NameUser";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import EmailAndPhone from "../components/EmailAndPhone";
import PasswordPlanel from "../components/PasswordPlanel";
import * as style from "../../style/styleSignup";
import { Dayjs } from "dayjs";

const InscriptionPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState<Dayjs | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [value, setValue] = useState(0);

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

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
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
      setValue((prevValue) => Math.min(prevValue + 1, 3));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

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
      console.log("User created:", response.data.user);
      setLoading(false);
      setFirstName("");
      setLastName("");
      setUserName("");
      setPhoneNumber("");
      setDateOfBirth(null);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || "An unknown error occurred");
      } else {
        setError("An unknown error occurred");
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
            />
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
              width: "100%",
              height: "100%",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "90%"
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "38px",
                  fontWeight: "900",
                }}
              >
                Inscription
              </Typography>
            </Grid>
            <form onSubmit={handleSubmit}>
              <Tabs
                value={value}
                onChange={handleChangeTab}
                textColor="inherit"
                variant="fullWidth"
                sx={{
                  display: "flex",
                  width: "100%",
                  mt: 3,
                  ".MuiTabs-indicator": {
                    display: "none",
                  },
                }}
              >
                <Tab label={<style.TabMenuBox>1</style.TabMenuBox>} value={0} />
                <Tab label={<style.TabMenuBox>2</style.TabMenuBox>} value={1} />
                <Tab label={<style.TabMenuBox>3</style.TabMenuBox>} value={2} />
                <Tab label={<style.TabMenuBox>4</style.TabMenuBox>} value={3} />
              </Tabs>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  marginTop: "20px",
                }}
              >
                <TabPanel value={value} index={0}>
                  <NameUser
                    firstName={firstName}
                    lastName={lastName}
                    userName={userName}
                    onChange={handleChange}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: 6,
                    }}
                  >
                    <style.BtnDefault
                      onClick={handleNextTab}
                      sx={{ width: "50%" }}
                    >
                      Suivant
                    </style.BtnDefault>
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateField"]}>
                      <DateField
                        label="Date de naissance"
                        name="dateOfBirth"
                        value={dateOfBirth}
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
                    open={success}
                    autoHideDuration={6000}
                    onClose={() => setSuccess(false)}
                  >
                    <Alert
                      onClose={() => setSuccess(false)}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Utilisateur créé avec succès !
                    </Alert>
                  </Snackbar>
                </TabPanel>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default InscriptionPage;
