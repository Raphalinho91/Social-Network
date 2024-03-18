import React from "react";
import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import * as style from "../../../style/styleSignup";

interface SendVerifyEmailOrPhoneProps {
  email: string;
  selectedValueRadio: string;
  handleChangeRadio: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitSendEmail: () => void;
}

const SendVerifyEmailOrPhone: React.FC<SendVerifyEmailOrPhoneProps> = ({
  email,
  selectedValueRadio,
  handleChangeRadio,
  handleSubmitSendEmail,
}) => (
  <style.BoxCenter sx={{ mt: 2 }}>
    <RadioGroup
      value={selectedValueRadio}
      onChange={handleChangeRadio}
      sx={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          border: "1px solid #7786F6",
          borderRadius: "10px",
          padding: "20px",
          width: "100%",
        }}
      >
        <FormControlLabel
          value="email"
          sx={{ width: "100%" }}
          control={
            <Radio
              sx={{ color: "#7786F6", "&.Mui-checked": { color: "#7786F6" } }}
            />
          }
          label={
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "15px",
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
                  style={{
                    color: "#7786F6",
                    fontWeight: "800",
                    fontSize: "13px",
                  }}
                >
                  {email}
                </span>
              </Typography>
            </Box>
          }
        />
      </Grid>
    </RadioGroup>
    <style.BtnDefault
      onClick={handleSubmitSendEmail}
      sx={{ mt: 5, width: "50%" }}
    >
      Envoyer le code
    </style.BtnDefault>
  </style.BoxCenter>
);

export default SendVerifyEmailOrPhone;
