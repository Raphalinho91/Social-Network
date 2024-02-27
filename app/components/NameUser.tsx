import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const NameUser = ({ firstName, lastName, userName, onChange }) => (
  <>
    <TextField
      type="text"
      name="firstName"
      placeholder="Prénom"
      value={firstName}
      onChange={onChange}
      required
      sx={{
        display: "flex",
        width: "100%",
      }}
    />
    <TextField
      type="text"
      name="lastName"
      placeholder="Nom de famille"
      value={lastName}
      onChange={onChange}
      required
      sx={{
        display: "flex",
        width: "100%",
        mt: 3,
      }}
    />
    <TextField
      type="text"
      name="userName"
      placeholder="Nom de l'utilisateur"
      value={userName}
      onChange={onChange}
      required
      sx={{
        display: "flex",
        width: "100%",
        mt: 3,
      }}
    />
  </>
);

NameUser.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NameUser;
