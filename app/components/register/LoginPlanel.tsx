import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as style from "../../../style/styleSignup";
import Link from "next/link";

const LoginPlanel = ({
  userName,
  password,
  setUsername,
  setPassword,
  handleNextTab,
  handleSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Typography
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "38px",
          fontWeight: "900",
          textAlign: "center",
          mb: 6,
        }}
      >
        Connection
      </Typography>
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
        <style.BtnDefault
          type="submit"
          onClick={handleSubmit}
          sx={{ width: "50%" }}
        >
          Connection
        </style.BtnDefault>
      </style.BoxCenter>
      <style.BoxCenter>
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Vous avez oubliez votre mot de passe ?{" "}
          <Link
            href=""
            onClick={handleNextTab}
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
            textAlign: "center",
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
    </>
  );
};

LoginPlanel.propTypes = {
  password: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleNextTab: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginPlanel;
