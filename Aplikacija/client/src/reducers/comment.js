import {
    GET_COMMENTS,
    COMMENT_LOADING
}from '../actions/types'

const initialState={
    comments:[],
    loading:true,
    error:{}
}
export default function(state=initialState,action){
    const {type,payload}=action;
    switch(type){
        case GET_COMMENTS:
            return{
                ...state,
                comments:payload,
                loading:false
            }
        case COMMENT_LOADING:
            return{
                ...state,
                loading:true
            }
        default:{
            return state
        }
    }
}