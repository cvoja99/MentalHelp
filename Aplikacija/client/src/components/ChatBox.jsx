import React from "react";
import { paperClasses } from "@mui/material/Paper";
import { MessageLeft, MessageRight } from "./Message";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from '../utils/axios';

export const ChatBox = ({targetUserId}) => {
    const [message, setMessage] = React.useState('');
    const [messages, setMessages] = React.useState([])
    const onSend = React.useCallback(() => {
        console.log(message);
        const getMessages =  async() => {

            const res = await axios.get("http://localhost:5000/whispers", { params: {targetuserId:targetUserId}});
            setMessages(res.data);
        }
        const sendMessages = async () => {
        await axios.post("http://localhost:5000/whispers", {targetUserId, body: message});

        getMessages();
        }
        if(message && targetUserId);
        sendMessages();
    },[targetUserId,message]);
    React.useEffect(() =>{
        const getMessages =  async() => {

            const res = await axios.get("http://localhost:5000/whispers", { params: {targetuserId:targetUserId}});
            setMessages(res.data);
        }
        getMessages();
        const interval = setInterval(() => {
            getMessages();
        }, 10000);
        return () => {
            clearInterval(interval);
        }
    }, [targetUserId])
      console.log(messages);
      
  return (
    <div >
      <paperClasses  zDepth={2}>
        <paperClasses  id="style-1" >
        {messages.map
            (message => 
                {
                    console.log(message.userId)
                    if(message.userId === targetUserId)
                        return <MessageLeft message={message.body} timestamp={message.createdAt}/>
                    return <MessageRight  message={message.body} timestamp={message.createdAt}/>
                }
            )
        }
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