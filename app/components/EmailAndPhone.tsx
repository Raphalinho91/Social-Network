import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const EmailAndPhone = ({ email, phoneNumber, onChange }) => (
  <>
    <TextField
      type="email"
      name="email"
      placeholder="Adresse email"
      value={email}
      onChange={onChange}
      sx={{
        display: "flex",
        width: "100%",
      }}
    />
    <TextField
      type="text"
      name="phoneNumber"
      placeholder="Numéro de téléphone"
      value={phoneNumber}
      onChange={onChange}
      sx={{
        display: "flex",
        width: "100%",
        mt: 3
      }}
    />
  </>
);

EmailAndPhone.propTypes = {
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EmailAndPhone;
