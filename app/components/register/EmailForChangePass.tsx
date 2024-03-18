import React from "react";
import PropTypes from "prop-types";
import { TextField, Typography } from "@mui/material";
import * as style from "../../../style/styleSignup";

const EmailForChangePass = ({ email, setEmail, handleSubmitSendEmail }) => (
  <>
    <Typography
      sx={{
        fontFamily: "Poppins, sans-serif",
        fontSize: "20px",
        fontWeight: "600",
        textAlign: "center",
        mb: 6,
      }}
    >
      Rentrez votre mail pour changer votre mot de passe !
    </Typography>
    <TextField
      type="email"
      name="email"
      placeholder="Adresse email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      sx={{
        display: "flex",
        width: "100%",
        mt: 1,
      }}
    />
    <style.BoxCenter>
      <style.BtnDefault
        onClick={handleSubmitSendEmail}
        sx={{ mt: 0, width: "50%" }}
      >
        Envoyer le code
      </style.BtnDefault>
    </style.BoxCenter>
  </>
);

EmailForChangePass.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  handleSubmitSendEmail: PropTypes.func.isRequired,
};

export default EmailForChangePass;
