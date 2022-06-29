import React, { Fragment } from 'react';
import {BrowserRouter, Route,Routes}from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
const theme = createTheme();
const StyledContainer = styled(Container)`
  padding-top: 20px;
`
const App=()=>(
  <ThemeProvider theme={theme}>
     <BrowserRouter>
          <Landing />
          <StyledContainer>
            <Routes>
              <Route exact path="/register" element={<Register />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
            </Routes>
          </StyledContainer>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
