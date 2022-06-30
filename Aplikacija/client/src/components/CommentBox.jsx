import React, { useState, useEffect} from "react";
import  Divider from "@mui/material/Divider"
import  Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import axios from '../utils/axios';
import moment from 'moment';

function CommentBox({comments}) {
  console.log({comments});  
  return (
    <div style={{ padding: 14 }} className="App">
      <h1>Comments</h1>
      {comments && comments.sort((a,b) => moment.utc(b.createdAt).diff(moment(a.createdAt))).map(comment => (
        <>
         <Paper style={{ padding: "40px 20px" }}>
         <Grid container wrap="nowrap" spacing={2}>
           <Grid justifyContent="left" item xs zeroMinWidth>
             <h4 style={{ margin: 0, textAlign: "left" }}>{comment.user.username}</h4>
             <p style={{ textAlign: "left" }}>
              {comment.body}
             </p>
             <p style={{ textAlign: "left", color: "gray" }}>
               Posted {moment(comment.createdAt).fromNow()}
             </p>
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
