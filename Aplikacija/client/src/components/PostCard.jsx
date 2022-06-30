import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import {Link}from 'react-router-dom';
const StyledCard=styled(Card)`
border:1px solid black;
`
const StyledCardActions=styled(CardActions)`
justify-content:space-between
padding:0.8rem;
`
const StyledTypography=styled(Typography)`
align-text:right;
margin-left:70%;
`

const StyledBox = styled(Box)`
    margin-bottom: 10px;
    position: relative;
`
const DeleteIconDiv=styled.div`
    display: flex;
    z-index: 10;
    flex: 1;
    position: absolute;
    right: 10px;
    align-items: flex-end;
    justify-content: flex-end;
`
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function OutlinedCard({post, onEdit, onVote, onDelete, isAuthenticated}) {
  console.log(isAuthenticated);
  return (
    <Link to={`/post/${post.id}`}>
    <StyledBox sx={{ minWidth: 275, cursor: 'pointer' }} onClick={() => console.log("sadfd")}>
      <StyledCard variant="outlined">
      <React.Fragment>
    <CardContent>
      {isAuthenticated && (<DeleteIconDiv><DeleteIcon onClick={(e) => {
        e.stopPropagation();
        onDelete();
}}/></DeleteIconDiv>)}

      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="h5" component="div">
       {post.description}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {post.body}
      </Typography>
      <Typography variant="body2">
        Created by: {post.user.email}
      </Typography>
    </CardContent>
    <StyledCardActions>
    {isAuthenticated && (<Button size="small" onClick={onEdit}>Edit</Button>)}

      <StyledTypography>
        Votes: {post.votes}
        {isAuthenticated && (<Button size="small" onClick={onVote}>Vote</Button>)}

      </StyledTypography>
    </StyledCardActions>

  </React.Fragment>

      </StyledCard>
    </StyledBox>
    </Link>
  );
}