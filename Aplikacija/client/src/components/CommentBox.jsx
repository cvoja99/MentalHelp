import React, { useState, useEffect} from "react";
import  Divider from "@mui/material/Divider"
import  Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import { COMMENT_LOADING, GET_COMMENTS  } from "../actions/types";
import axios from '../utils/axios';
import moment from 'moment';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const DeleteIconDiv=styled.div`
    display: flex;
    z-index: 10;
    flex: 1;
    position: absolute;
    right: 80px;
    align-items: flex-end;
    justify-content: flex-end;
`
const delay = ms => new Promise(res => setTimeout(res, ms));
function CommentBox({comments, postId, onEdit}) {
  const onVote = async (id) => {
    try {
    dispatch({type:COMMENT_LOADING})
    await delay(400);
    const res = await axios.post("http://localhost:5000/votes/comment", {commentId: id})
    console.log(res);
    const res2 = await axios.get(`http://localhost:5000/comments/${postId}`)
    dispatch({type: GET_COMMENTS, payload: res2.data })
    } catch(e) {
        console.error(e);
    }
}
  console.log({comments});  
  const dispatch = useDispatch();
  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/comments/${id}`);
      const res = await axios.get(`http://localhost:5000/comments/${postId}`)
                console.log(res);
                ;
            dispatch({type: GET_COMMENTS, payload: res.data })
    } catch(e) {
      console.log(e);
    }
  }
  const { token: isAuthenticated } = useSelector(state => state.auth);
  return (
    <div style={{ padding: 14 }} className="App">
      <h1>Comments</h1>
      {comments && comments.sort((a,b) => moment.utc(b.createdAt).diff(moment(a.createdAt))).map(comment => (
        <>
         <Paper style={{ padding: "40px 20px" }} onClick={() => onEdit({
          id: comment.id,
          body: comment.body
         })}>
         <Grid container wrap="nowrap" spacing={2}>
         {!!isAuthenticated && (<DeleteIconDiv><DeleteIcon onClick={(e) => {
        e.stopPropagation();
        onDelete(comment.id);
}}/></DeleteIconDiv>)}
           <Grid justifyContent="left" item xs zeroMinWidth>
             <h4 style={{ margin: 0, textAlign: "left" }}>{comment.user.username}</h4>
             <p style={{ textAlign: "left" }}>
              {comment.body}
             </p>
             <p style={{ textAlign: "left", color: "gray" }}>
               Posted {moment(comment.createdAt).fromNow()}
             </p>
             <Typography>
          Votes: {comment.votes}
        { isAuthenticated && (<Button size="small" onClick={(e) => {
                  e.stopPropagation();

          onVote(comment.id)}}>Vote</Button>)}

      </Typography>
           </Grid>
         </Grid>
         <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
         </Paper>
         </>
      ))}
    </div>
  );
}

export default CommentBox;
