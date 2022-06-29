import React, { useState, useCallback } from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData;
  const handleSubmit = useCallback(() => {
    axios.post('http://localhost:5000/auth', {email, password}).then(res => { console.log(res)}).catch(e => console.error(e.response));
  },[email, password]);

  console.log(formData);
  return (
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
    </Container>
  )
}

export default Login
