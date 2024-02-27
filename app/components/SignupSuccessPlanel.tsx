import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import * as style from "../../style/styleSignup";
import Link from "next/link";

const SignupSuccessPlanel = ({ userName }) => (
  <>
    <style.BoxCenter>
      <Typography
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "18px",
          fontWeight: "600",
          mt: 1,
        }}
      >
        Super, votre compte a été créer{" "}
        <span style={{ color: "#7786F6" }}>{userName}</span> !
      </Typography>
      <Typography
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "15px",
          fontWeight: "500",
          mt: 1,
        }}
      >
        Vous pouvez maintenant vous connectez !
      </Typography>
    </style.BoxCenter>
    <style.BoxCenter>
      <style.BtnDefault sx={{ width: "50%" }}>
        <Link
          href="/login"
          style={{
            textDecoration: "none",
            listStyle: "none",
            color: "#FFF",
          }}
        >
          Connectez-vous
        </Link>
      </style.BtnDefault>
      <Typography
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "14px",
          fontWeight: "600",
          mt: 3,
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

SignupSuccessPlanel.propTypes = {
  userName: PropTypes.string,
};

export default SignupSuccessPlanel;
