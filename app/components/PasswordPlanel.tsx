import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordPanel = ({ password, confirmPassword, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <TextField
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Mot de passe"
        value={password}
        onChange={onChange}
        sx={{ display: "flex", width: "100%" }}
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
          )
        }}
      />
      <TextField
        type={showConfirmPassword ? "text" : "password"}
        name="confirmPassword"
        placeholder="Confirmez votre mot de passe"
        value={confirmPassword}
        onChange={onChange}
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
          )
        }}
      />
    </>
  );
};

PasswordPanel.propTypes = {
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PasswordPanel;
