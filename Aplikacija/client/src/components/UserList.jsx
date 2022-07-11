import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CircleIcon from '@mui/icons-material/Circle';
import StarIcon from '@mui/icons-material/Star';
import axios from '../utils/axios';
import styled from 'styled-components';

const StyledButton = styled(ListItemButton)`
    border: 1px solid teal;
    border-radius: 20px;
    margin: 5px;
`;
export const UserList=({setStrucnoLice}) => {
    const [userList,setUserList] = React.useState([]);
    
    React.useEffect(() => {
        const getUsers =  async() => {
            const res = await axios.get("http://localhost:5000/users/strucna_lica");
            console.log(res.data);
            setUserList(res.data);
        }
        getUsers();
    }, [])
    
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      aria-label="contacts"
    >
        <div>Online strucna lica:</div>
        {userList && userList.map(user => <ListItem disablePadding>
        <StyledButton onClick={() => {
            setStrucnoLice(user.id);
        }}>
          <ListItemText primary={user.username  } />
          <CircleIcon color="green" htmlColor='green'/>  
        </StyledButton>
      </ListItem>)}
      
    </List>
  );
}