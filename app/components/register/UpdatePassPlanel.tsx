import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import * as style from "../../../style/styleSignup";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const UpdatePassPlanel = ({
  newPassword,
  setNewPassword,
  confirmNewPassword,
  setConfirmNewPassword,
  handleSubmitUpdatePassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
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
        Rentrez votre nouveau mot de passe !
      </Typography>
      <TextField
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Mot de passe"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
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
      <TextField
        type={showConfirmPassword ? "text" : "password"}
        name="password"
        placeholder="Confirmé votre mot de passe"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        sx={{ display: "flex", width: "100%", mt: 3 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={toggleConfirmPasswordVisibility}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <style.BoxCenter>
        <style.BtnDefault
          onClick={handleSubmitUpdatePassword}
          sx={{ mt: 0, width: "50%" }}
        >
          Modifier le mot de passe
        </style.BtnDefault>
      </style.BoxCenter>
    </>
  );
};

UpdatePassPlanel.propTypes = {
  newPassword: PropTypes.string.isRequired,
  setNewPassword: PropTypes.func.isRequired,
  handleSubmitUpdatePassword: PropTypes.func.isRequired,
};

export default UpdatePassPlanel;
