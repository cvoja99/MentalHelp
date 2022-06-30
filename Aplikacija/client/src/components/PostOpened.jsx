import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { useParams }from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from '../utils/axios';
import CommentBox from "./CommentBox";
import {GET_COMMENTS,COMMENT_LOADING}from '../actions/types';
import { useSelector, useDispatch } from 'react-redux';
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
    margin-bottom: 10px
`

const delay = ms => new Promise(res => setTimeout(res, ms));
export default function OutlinedCard() {
    const dispatch=useDispatch();
    const [formData, setFormData] = React.useState({
        id: null,
        body: '',
    })
    const {body,id} =formData;

    const onSubmit = React.useCallback(async () => {
        try {
            if(id) {
                await axios.put(`http://localhost:5000/comments/${id}`, {body});
                const res = await axios.get(`http://localhost:5000/comments/${postId}`)
                console.log(res);
                ;
            dispatch({type: GET_COMMENTS, payload: res.data })
            setFormData({
                id: null,
                body: '',
              })
                return;
            }
            dispatch({type:COMMENT_LOADING});
            await delay(400);
            const result = await axios.post("http://localhost:5000/comments", { body, postId});
            console.log(result);
            const res = await axios.get(`http://localhost:5000/comments/${postId}`)
            console.log(res);
            dispatch({type: GET_COMMENTS, payload: res.data })
            setFormData({
                id: null,
                body: '',
              })
        } catch(e) {
            console.log(e);
            if (e.response.status===403)
            alert("You cannot edit other people's comments!");
            console.error(e);
        }
    },[id, body, dispatch])
    const { id:postId } = useParams();
    const [post, setPost] = useState(null)
    const { token: isAuthenticated } = useSelector(state => state.auth);
    const { loading } = useSelector(state => state.post);
    const { comments } = useSelector(state => state.comment)
        useEffect(() => {
        const getPost = async () => {
            try {
                if(postId) {
                const res = await axios.get(`http://localhost:3000/posts/${postId}`);
                setPost(res.data);
                const resp = await axios.get(`http://localhost:5000/comments/${postId}`)
                console.log({com: resp.data});
            dispatch({type: GET_COMMENTS, payload: resp.data })
                }
            } catch(e) {
                console.error(e);
                setPost(null);
            }
        }
       getPost();
    }, [postId])
    return post ? (
    <React.Fragment>
    <StyledBox sx={{ marginTop:15,minWidth: 275, cursor: 'pointer' }} onClick={() => console.log("sadfd")}>
      <StyledCard variant="outlined">
      <React.Fragment>
    <CardContent>
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
      <StyledTypography>
        Votes: {post.votes}
      </StyledTypography>
    </StyledCardActions>

  </React.Fragment>

      </StyledCard>
    </StyledBox>
    <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
           <Typography component="h1" variant="h5">
           {id && (<Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setFormData({
                id: null,
                body: '',
              })}
            >
              Close edit
            </Button>)}
            {id ? "Comment edit form" : "Comment create form"}
          </Typography>
          <Box component="form" onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }} noValidate sx={{ mt: 1 }}>
                
            <TextField
              margin="normal"
              required
              fullWidth
              id="body"
              value={body}
              onInput={(e) => setFormData({...formData, body: e.target.value})}
              label="Body"
              name="body"
              autoComplete="body"
              autoFocus
            />
     
<Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {id ? "Edit comment" : "Create comment"}
            </Button>
          </Box>
    </Box>
    <CommentBox comments={comments} postId={postId} onEdit={({id, body}) => {
        setFormData({
            id,
            body
        })
    }}>

    </CommentBox>
    </React.Fragment>
  ) : null;
}