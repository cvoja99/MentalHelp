import { ForumTopDiv } from './styles/ForumTopDiv';
import React from 'react';
import OutlinedCard from './PostCard';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import axios from '../utils/axios';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import {POST_LOADING, GET_POSTS, CHECK_LOGIN } from '../actions/types';
import { SearchBar } from './SearchBar';
import {PaginationStyled} from './Pagination';

const ContainerStyledForum=styled(Container)`
width:30%
diplay:flex;
justify-content:space-between;
margin-bottom:12px;
margin-top:12px;
`
const delay = ms => new Promise(res => setTimeout(res, ms));
const Forum=()=> {
    const dispatch = useDispatch();
const [formData, setFormData] = React.useState({
    id: null,
    title: '',
    body: '',
    description: ''
})
const [searchQuery, setSearchQuery] = React.useState("");
const [radioValue, setRadioValue] = React.useState("Title");
const [page, setPage] = React.useState(1);
const { id, title, body, description } = formData;
const { posts, loading } = useSelector(state => state.post)
const { token: isAuthenticated } = useSelector(state => state.auth);

const onVote = async (id) => {
    try {
    dispatch({type:POST_LOADING})
    await delay(400);
    const res = await axios.post("http://localhost:5000/votes/post", {postId: id})
    console.log(res);
    const res2 = await axios.get("http://localhost:5000/posts");
    dispatch({type: GET_POSTS, payload: res2.data })
    } catch(e) {
        console.error(e);
    }
}

const onSearch = React.useCallback(() => {
  console.log('HERE')
  const searchPosts = async () => {
  const res = await axios.get("http://localhost:5000/posts", { params: { offset: (page-1)*10, ...(radioValue === 'Title' && {title: searchQuery}),...(radioValue === 'Username' && {userName: searchQuery}) } });
  dispatch({type: GET_POSTS, payload: res.data });
  }
  searchPosts();

}, [searchQuery, radioValue, page]);
React.useEffect(() => {
    const getPosts =  async() => {
      dispatch({type:POST_LOADING});
      await delay(400);
        const res = await axios.get("http://localhost:5000/posts", { params: {offset: (page-1)*10}});
        dispatch({type: GET_POSTS, payload: res.data })
    }
    getPosts();
}, [])
React.useEffect(() =>{
  const searchPosts = async () => {
    const res = await axios.get("http://localhost:5000/posts", { params: { offset: (page-1)*10, ...(radioValue === 'Title' && {title: searchQuery}),...(radioValue === 'Username' && {userName: searchQuery}) } });
    dispatch({type: GET_POSTS, payload: res.data });
    }
    searchPosts();
}, [page]);
const onDelete = async (id) => {
    try{
        dispatch({type:POST_LOADING});
        await delay(400);
        await axios.delete(`http://localhost:5000/posts/${id}`);
            const res = await axios.get("http://localhost:5000/posts");
        dispatch({type: GET_POSTS, payload: res.data })
    }
    catch(err){
        if (err.response.status===403)
        alert("You cannot delete posts from other users!");
        const res = await axios.get("http://localhost:5000/posts");
        dispatch({type: GET_POSTS, payload: res.data })
        console.log(err.response.status);
        console.error(err);
    }
}
const onSubmit = React.useCallback(async () => {
    try {
        if(id) {
            dispatch({type:POST_LOADING});
            await delay(400);
            await axios.put(`http://localhost:5000/posts/${id}`, { title,body,description});
            const res = await axios.get("http://localhost:5000/posts");
        dispatch({type: GET_POSTS, payload: res.data })
        setFormData({
            id: null,
            title: '',
            body: '',
            description: ''
          })
            return;
        }
        dispatch({type:POST_LOADING});
        await delay(400);
        await axios.post("http://localhost:5000/posts", { title, body, description});
        const res = await axios.get("http://localhost:5000/posts");
        dispatch({type: GET_POSTS, payload: res.data })
        setFormData({
            id: null,
            title: '',
            body: '',
            description: ''
          })
        setPage(1);
    } catch(e) {
        if (e.response.status===403)
        alert("You cannot edit other people's posts!");
        const res = await axios.get("http://localhost:5000/posts");
        dispatch({type: GET_POSTS, payload: res.data })
        console.error(e);
    }
},[id, title, body, description, dispatch])
const {count}= useSelector(state=>state.post);
return loading ? <Box sx={{ display: 'flex',  flexDirection: 'column',
  alignItems: 'center',marginTop: 50 }}>
  <CircularProgress />
</Box>  : (
        <ForumTopDiv>
            <ContainerStyledForum>
            {isAuthenticated&&(<SearchBar radioValue={radioValue} setRadioValue={setRadioValue} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={(val) => { onSearch(val)}} />)}
            {posts.map(post => (<OutlinedCard isAuthenticated={!!isAuthenticated} post={post} onDelete={() => onDelete(post.id)} onVote={() => onVote(post.id)} onEdit={() => {
                 setFormData({
                    id: post.id,
                    title: post.title,
                    body: post.body,
                    description: post.description
                });
            }} />))}
            <PaginationStyled count={Math.ceil(count/10)} page={page} setPage={setPage}></PaginationStyled>
            </ContainerStyledForum>
            {!!isAuthenticated && (<div>
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
              onClick={() =>
                
                setFormData({
                id: null,
                title: '',
                body: '',
                description: ''
              })
            }

            >
              Close edit
            </Button>)}
            {id ? "Post edit form" : "Post create form"}
          </Typography>
          <Box component="form" onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }} noValidate sx={{ mt: 1 }}>
                   <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              value={title}
              onInput={(e) => setFormData({...formData, title: e.target.value})}
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
            />
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
     
            <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                value={description}
                onInput={(e) => setFormData({...formData, description: e.target.value})}
                label="Description"
                name="description"
                autoComplete="description"
                autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {id ? "Edit post" : "Create post"}
            </Button>
          </Box>
    </Box>
            
            </div>)}
        </ForumTopDiv>
)
}
export default Forum;