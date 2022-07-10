import React from 'react'
import { LandingStyled, TopNav,LogoStyledPlacement} from '../styles/Landing.styled'
import { Auth } from '../styles/Landing.styled'
import { useSelector, useDispatch } from 'react-redux';
import {Link, useNavigate}from 'react-router-dom'
import { LOGOUT } from '../../actions/types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const StyledButton=styled(Button)`
background-color:white;
width:200px
`
const Landing = () => {
  const { token, userName } = useSelector(state => state.auth);
  console.log(token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <LandingStyled>
      <TopNav>
        <Auth>
          <Box sx={{ '& button': { m: 1 } }}>
            <ul className='list-style: none"'>
            
            
            <LogoStyledPlacement> MentalHelp</LogoStyledPlacement>  
            {userName&&(<div style={{marginRight:'200px'}}>Logged in as: {userName}</div>)}
            {!token && (<StyledButton variant="outlined" size="small"><Link to="/register"> Sign Up </Link> </StyledButton>)}
            {!token && (<StyledButton variant="outlined" size="small"> <Link to="/login">Login</Link></StyledButton>)}
            <StyledButton variant="outlined" size="small"> <Link to ="/forum">Forum</Link> </StyledButton>
            {token && (<StyledButton variant="outlined" size="small" onClick={() => {
              dispatch({type: LOGOUT});
              navigate("/login");
            }}>Logout</StyledButton>)}
            </ul>
          </Box>
        </Auth>
        
      </TopNav>
    </LandingStyled>
  )
}

export default Landing
