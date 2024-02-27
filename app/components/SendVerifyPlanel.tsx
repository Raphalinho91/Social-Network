import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import * as style from "../../style/styleSignup";

const SendVerifyEmailOrPhone = ({ email, phoneNumber }) => (
  <>
    <style.BoxCenter sx={{ mt: 2 }}>
      <Grid
        item
        sx={{
          border: "1px solid #7786F6",
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Vérifiez votre compte avec votre numéro !
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "13px",
            fontWeight: "400",
            mt: 1,
          }}
        >
          Envoyez un SMS au{" "}
          <span
            style={{ color: "#7786F6", fontWeight: "800", fontSize: "14.5px" }}
          >
            {phoneNumber}
          </span>
        </Typography>
      </Grid>
      <Grid
        item
        sx={{
          width: "100%",
          display: 'flex',
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Ou
        </Typography>
        </Grid>
      <Grid
        item
        sx={{
          border: "1px solid #7786F6",
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          padding: "20px",
          mt: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Vérifiez votre compte avec votre adresse mail !
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "13px",
            fontWeight: "400",
            mt: 1,
          }}
        >
          Envoyez un mail à{" "}
          <span
            style={{ color: "#7786F6", fontWeight: "800", fontSize: "14.5px" }}
          >
            {email}
          </span>
        </Typography>
      </Grid>
    </style.BoxCenter>
  </>
);

SendVerifyEmailOrPhone.propTypes = {
  email: PropTypes.string,
  phoneNumber: PropTypes.string,
};

export default SendVerifyEmailOrPhone;
