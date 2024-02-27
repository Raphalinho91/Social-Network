import React from 'react';
import RootLayout from './layout';
import FirstPage from './Home/FirstPage';
import { Container } from '@mui/material';

const Page: React.FC = () => {
  return (
    <RootLayout>
      <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: '35px',
            height: "90vh",
          }}>
        <FirstPage />
      </Container>
    </RootLayout>
  );
};

export default Page;
