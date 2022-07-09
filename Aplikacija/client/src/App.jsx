import React from 'react';
import {BrowserRouter, Route,Routes}from 'react-router-dom';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Forum from './components/Forum.jsx';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import {Provider} from 'react-redux';
import store from './store';
import PostOpened from './components/PostOpened.jsx';
const theme = createTheme();
const StyledContainer = styled(Container)`
  padding-top: 20px;
`
const App=()=>{

  return (
  <Provider store={store}>
  <ThemeProvider theme={theme}>
     <BrowserRouter>
          <Landing />
          <StyledContainer>
            <Routes>
              <Route exact path="/register" element={<Register />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/forum" element={<Forum/>}></Route>
              <Route path='/post/:id' element ={<PostOpened/>}></Route>
            </Routes>
          </StyledContainer>
    </BrowserRouter>
  </ThemeProvider>
  </Provider>
)};

export default App;
