import React, { useState, useCallback } from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { StyledTextField } from '../styles/StyledTextField';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username:'',
    tip: 'Korisnik'
  })
  const [isValid, setValidPassword] = React.useState(true);
  const [error,setError]=useState('');
  const { tip,email, password,username,confirmPassword } = formData;
  const handleSubmit = useCallback(() => {
    if(password !== confirmPassword) {
      setValidPassword(false);
      setError("Passwords do not match");
      return;
    } 
      axios.post('http://localhost:5000/users',{tip,email,password,username}).then(res=>{console.log(res)}).catch(e=>setError(e.response.data.message));
      },[tip,email,password,username, confirmPassword]);
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
            Register
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
              value={username}
              onInput={(e)=>setFormData({...formData,username:e.target.value})}
              name="username"
              label="Username"
              type="text"
              id="username"
              autoComplete="username"
            />
            <StyledTextField isvalid={isValid}
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              onInput={(e)=>setFormData({...formData,password:e.target.value})}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />  
            <StyledTextField isvalid={isValid}
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              value={confirmPassword}
              onInput={(e)=>setFormData({...formData,confirmPassword:e.target.value})}
              type="password"
              id="confirmPassword"
              autoComplete="confirmPassword"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            {error&& <div>
             { error}
            </div>}
          </Box>
    </Box>
    </Container>
  )
}

export default Register
