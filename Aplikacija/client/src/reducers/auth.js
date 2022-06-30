import {REGISTER_SUCCESS, REGISTER_FAIL, LOADING, USER_LOADED, LOGOUT}from '../actions/types';

const initialState={
    token:null,
    isAuthenticated:null,
    loading:false,
    user:null
}
export default function(state=initialState,action){
    const {type,payload}=action;
    switch(type){
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case USER_LOADED:
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        case REGISTER_SUCCESS:
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false
            }
        case LOGOUT:     
        localStorage.removeItem('token');
            return initialState;
        default:
            return state;
    }
}