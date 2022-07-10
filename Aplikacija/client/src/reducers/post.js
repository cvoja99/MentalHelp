import {
    GET_POSTS,
    POST_ERROR,
    POST_LOADING
}from '../actions/types'

const initialState={
    posts:[],
    post:null,
    count:0,
    loading:true,
    error:{}
}
export default function(state=initialState,action){
    const {type,payload}=action;
    switch(type){
        case GET_POSTS:
            return{
                ...state,
                posts:payload.posts,
                count:payload.postCount,
                loading:false
            }
         case POST_ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            }
            case POST_LOADING:
                return{
                    ...state,
                    loading:true
                }
        default:
            {
                return state
            }
    }
}