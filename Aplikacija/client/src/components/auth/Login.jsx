import React, { useState, useCallback } from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import axios from '../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { AUTH_ERROR, LOADING, USER_LOADED } from '../../actions/types';

const delay = ms => new Promise(res => setTimeout(res, ms));

const Login = () => {
  let navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const dispatch = useDispatch();
  const { email, password } = formData;
  const { loading } = useSelector(state => state.auth);
  const handleSubmit = useCallback(async () => {
    
    
      /*if (localStorage.token){
        setAuthToken(localStorage.token);
      }*/

      dispatch({
        type: LOADING
      })
      try{

        await delay(400);
        const res=await axios.post('http://localhost:5000/auth', {email, password});
        dispatch({
          type:USER_LOADED,
          payload:res.data
        })
        navigate("/forum");
      }
      catch(err){
        dispatch({
          type:AUTH_ERROR
        })
      }
    }
    /*axios.post('http://localhost:5000/auth', {email, password}).then(res => { console.log(res)}).catch(e => console.error(e.response));
  }*/,[email, password,dispatch]);
  /*if(isAuthenticated){
    return <Redirect to="/forum"/>
  }*/
  return loading ? <Box sx={{ display: 'flex',  flexDirection: 'column',
  alignItems: 'center',marginTop: 50 }}>
  <CircularProgress />
</Box>  : (
    <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
           <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={(e) => {
            e.preventDefault();
          handleSubmit()}} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={email}
              onInput={(e) => setFormData({...formData, email: e.target.value})}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              name="password"
              onInput={(e) => setFormData({...formData, password: e.target.value})}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
    </Box>
    <p>
      Don't have an account? <Link to='/register'>Sign Up</Link>
    </p>
    </Container>
  )
}
export default Login
