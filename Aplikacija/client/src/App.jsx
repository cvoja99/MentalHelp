import React, { Fragment } from 'react';
import {BrowserRouter, Route,Routes}from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import {Container} from './components/styles/container.styled';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();

const App=()=>(
  <ThemeProvider theme={theme}>
     <BrowserRouter>
          <Routes>
           <Route exact path='/' element={<Landing />} />
          </Routes>
          <Container>
            <Routes>
              <Route exact path="/register" element={<Register />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
            </Routes>
          </Container>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
