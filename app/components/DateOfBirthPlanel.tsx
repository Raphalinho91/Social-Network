import * as React from "react";
import PropTypes from "prop-types";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

export default function DateOfBirthPlanel({ dateOfBirth, onChange }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateField"]}>
        <DateField
          label="Date de naissance"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={onChange}
          sx={{
            display: "flex",
            width: "100%",
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

DateOfBirthPlanel.propTypes = {
  dateOfBirth: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
