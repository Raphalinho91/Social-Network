import React, { useState, useRef, KeyboardEvent } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import * as style from "../../../style/styleSignup";

interface OtpInputProps {
  length: number;
  onComplete: (otp: string) => void;
  handleSubmitSendEmail: () => void;
  handleSubmitVerifyEmail: () => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length, onComplete, handleSubmitSendEmail, handleSubmitVerifyEmail }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(length).fill(null)
  );

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.toUpperCase();
    setOtp(newOtp);

    if (value.length > 0 && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((num) => num.length === 1)) {
      onComplete(newOtp.join(""));
    }
  };

  const handleBackspace = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <style.BoxCenter sx={{ mt: 3 }}>
      <Typography
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "20px",
          fontWeight: "600",
        }}
      >
        Veuillez rentrer le code reçu
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", gap: "10px", mt: 6 }}
      >
        {otp.map((data, index) => (
          <TextField
            key={index}
            type="text"
            inputProps={{
              maxLength: 1,
              style: { textAlign: 'center', textTransform: 'uppercase' }
            }}
            value={data}
            onChange={(e) => handleChange(e.target.value, index)}
            onFocus={(e) => e.target.select()}
            onKeyDown={(e) => handleBackspace(e, index)}
            inputRef={(el) => (inputRefs.current[index] = el)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#7786F6', 
                },
                '&:hover fieldset': {
                  borderColor: '#7786F6', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#7786F6',
                },
              },
            }}
          />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mt: 6,
        }}
      >
        <style.BtnDefault sx={{ width: "47%" }} onClick={handleSubmitSendEmail}>
          Renvoyez le code
        </style.BtnDefault>
        <style.BtnDefault sx={{ width: "47%" }} onClick={handleSubmitVerifyEmail}>
          Vérifiez le code
        </style.BtnDefault>
      </Box>
    </style.BoxCenter>
  );
};

export default OtpInput;
