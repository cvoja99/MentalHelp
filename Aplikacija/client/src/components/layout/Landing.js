import React from 'react'
import { LandingStyled, TopNav,LogoStyledPlacement,Button} from '../styles/Landing.styled'
import { Auth } from '../styles/Landing.styled'
import { useSelector, useDispatch } from 'react-redux';
import {Link, useNavigate}from 'react-router-dom'
import { LOGOUT } from '../../actions/types';
const Landing = () => {
  const { token } = useSelector(state => state.auth);
  console.log(token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <LandingStyled>
      <TopNav>
        <Auth>
            <ul className='list-style: none"'>
            <LogoStyledPlacement> MentalHelp</LogoStyledPlacement>
            {!token && (<Button><li><Link to="/register">Sign up</Link></li></Button>)}
            {!token && (<Button> <li><Link to="/login">Login</Link></li></Button>)}
            <Button> <li><Link to="/forum">Forum</Link></li></Button>
            {token && (<Button onClick={() => {
              dispatch({type: LOGOUT});
              navigate("/login");
            }}>logout</Button>)}

            </ul>
        </Auth>
        
      </TopNav>
    </LandingStyled>
  )
}

export default Landing
