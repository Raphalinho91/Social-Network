import React, { useState, useRef, KeyboardEvent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const OtpInput = ({ length, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(length).fill(null));

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length > 0 && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every(num => num.length === 1)) {
      onComplete(newOtp.join(""));
    }
  };

  const handleBackspace = (e: KeyboardEvent<HTMLDivElement>, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', mt: 6 }}>
      {otp.map((data, index) => (
        <TextField
          key={index}
          type="text"
          inputProps={{ maxLength: 1 }}
          value={data}
          onChange={e => handleChange(e.target.value, index)}
          onFocus={e => e.target.select()}
          onKeyDown={e => handleBackspace(e, index)}
          inputRef={el => (inputRefs.current[index] = el)}
        />
      ))}
    </Box>
  );
};

export default OtpInput;
