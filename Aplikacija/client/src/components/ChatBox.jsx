import React from "react";
import { paperClasses } from "@mui/material/Paper";
import { MessageLeft, MessageRight } from "./Message";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from '../utils/axios';

export const ChatBox = (targetUserId) => {
    const [message, setMessage] = React.useState('');
    const onSend = React.useCallback(() => {
        console.log(message);
        const sendMessages = async () => {
        await axios.post("http://localhost:5000/whispers", {targetUserId, body: message});
        }
        if(message && targetUserId);
        sendMessages();
    },[targetUserId,message])
      
  return (
    <div >
      <paperClasses  zDepth={2}>
        <paperClasses  id="style-1" >
          <MessageLeft
            message="123"
            timestamp="MM/DD 00:00"
            displayName="testsend"
          />
          <MessageLeft
            message="123"
            timestamp="MM/DD 00:00"
            displayName="testsend"
          />
          <MessageRight
            message="123"
            timestamp="MM/DD 00:00"
            displayName="test"
          />
          <MessageRight
            message="123"
            timestamp="MM/DD 00:00"
            displayName="test"
          />
          <TextField
              margin="normal"
              required
              fullWidth
              id="message"
              value={message}
              onInput={(e) => setMessage(e.target.value)}
              label="chat..."
              name="message"
              autoComplete="message"
              autoFocus
            />
            <Button
              fullWidth
              variant="contained"
              onClick={onSend}
              sx={{ mt: 3, mb: 2 }}
            >
             Send Message
            </Button>
        </paperClasses >
      </paperClasses >
    </div>
  );
}