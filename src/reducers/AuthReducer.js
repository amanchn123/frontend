
import React from "react";

const initialState={
     authdata:JSON.parse(localStorage.getItem("Auth"))
}

export const ReducerLogin=(state=initialState,action)=>{
    
    switch(action.type){
        case "LOGIN_REQUEST":
            return {...state,loading:true}

        case "LOGIN_SUCCESS":
            localStorage.setItem("Auth",JSON.stringify(action.payload))
            return{...state,authdata:action.payload,loading:false}  
            
        case "LOGIN_FAILED":
            return{loading:false}
            
        default :
        return {...state}   
    }
    
}


export const ReducerRegister=(state,action)=>{
    switch(action.type){
       case "REGISTER_REQUEST":
             return{...state,loading:true}
 
       case "REGISTER_SUCCESS":
        // localStorage.setItem("Auth",JSON.stringify(action.payload))
             return {...state,authdata:action.payload,loading:false}
             
       case "REGISTER_FAILED":
             return {...state,loading:false}
             
       default :
            return {...state}      
    } 
 }

 export const getFollower=(state,action)=>{
    switch(action.type){
        case "FOLLOWER_REQUEST":
            return {...state,Followerloading:true}

         case "FOLLOWER_SUCCESS":
            return {...state,data:action.data,Followerloading:false}

         case "FOLLOWER_FAILED":
            return {...state,Followerloading:false}
            
         default:
            return{...state}   
    }
 }

 export const getAllUserReducer=(state,action)=>{
    switch(action.type){
        case "GETUSER_REQUEST":
            return{...state,loading:true}

        case "GETUSER_SUCCESS":
            return{...state,data:action?action.data:"",loading:false}
            
        case "GETUSER_FAILED":
            return{...state,loading:false}
            
        default:
            return{...state}    
    }
 }

 export const followUnfollow=(state,action)=>{
    switch(action.type){
        case "FOLLOW_REQUEST":
            return{...state}
        case "FOLLOW_SUCCESS":
            return{...state,data:action.data}
            
        case "FOLLOW_FAILED":
            return{...state}
            
        default :
        return{...state}    
    }
 }

 export const currentUserReducer=(state,action)=>{
    switch(action.type){
        case "CURRENTUSER_REQUEST":
            return{...state,loading:true}
        case "CURRENTUSER_SUCCESS":
            return{...state,data:action.data,loading:false}
        case "CURRENTUSER_FAILED":
            return{...state,loading:false}

        default:
            return {...state}    
    }
 }