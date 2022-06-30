import React,{useState}from 'react';
import axios from 'axios';

const Comments = () => {
    const [backendComments,setBackendComments]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5000/comments',{tip,email,password,username}).then(res=>{console.log(res)}).catch(e=>setError(e.response.data.message));
    },[])
    return <div>Comments</div>
}

export default Comments
