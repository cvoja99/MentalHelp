import React from 'react'
import { LandingStyled, TopNav,LogoStyledPlacement,Button} from '../styles/Landing.styled'
import { Auth } from '../styles/Landing.styled'
import {Link}from 'react-router-dom'
const landing = () => {
  return (
    <LandingStyled>
      <TopNav>
        <Auth>
            <ul>
            <LogoStyledPlacement> MentalHelp</LogoStyledPlacement>
            <Button><li><Link to="/register">Sign up</Link></li></Button>
            <Button> <li><Link to="/login">Login</Link></li></Button>
            </ul>
        </Auth>
        
      </TopNav>
    </LandingStyled>
  )
}

export default landing
