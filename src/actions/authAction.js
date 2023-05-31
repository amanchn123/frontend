import React from 'react'
import axios from "axios";
import { useSelector } from 'react-redux';
import { Api_url } from '../apiurl';


export const LoginAction=(data)=>async(dispatch)=> {
   const tok=JSON.parse(localStorage.getItem("Auth"))?JSON.parse(localStorage.getItem("Auth")).token:""
     dispatch({type:"LOGIN_REQUEST"})
     try{
           const result=await axios.post(`${Api_url}/apii/loginuser`,{
            username:data.username,
            password:data.password
           })

           if(result.data.success){
            dispatch({type:"LOGIN_SUCCESS",payload:result.data})
           } 
           else{
            dispatch({type:"LOGIN_FAILED"})
           }
        
     }catch (error){
      dispatch({type:"LOGIN_FAILED"})
        console.log(error)
     }
}

export const RegisterAction=(data)=>async(dispatch)=>{
   const tok=JSON.parse(localStorage.getItem("Auth"))?JSON.parse(localStorage.getItem("Auth")).token:""
      dispatch({type:"REGISTER_REQUEST"})
   try{
       const result=await axios.post(`${Api_url}/apii/registeruser`,{

         username:data.username,
         firstName:data.firstName,
         lastName:data.lastName,
         password:data.password
       })

       console.log(result.data)
       if(result.data.success){
            dispatch({type:'REGISTER_SUCCESS',payload:result.data})
       }
        else{
            dispatch({type:"REGISTER_FAILED"})
        }      
   }catch (error){
      
      dispatch({type:"REGISTER_FAILED"})
   }
}


export const followerData=(id)=>async(dispatch)=>{
   const tok=JSON.parse(localStorage.getItem("Auth"))?JSON.parse(localStorage.getItem("Auth")).token:""
   dispatch({type:"FOLLOWER_REQUEST"})
   try{
      const response=await axios.post(`${Api_url}/apii/getFollower`,{
         id:id,
      },{
         headers:{
            authorization:tok
         },

      })
      dispatch({type:"FOLLOWER_SUCCESS",data:response.data})
   }catch (error){
       
       dispatch({type:"FOLLOWER_FAILED"}) 
   }
}

export const getUser=()=>async(dispatch)=>{
   const tok=JSON.parse(localStorage.getItem("Auth"))?JSON.parse(localStorage.getItem("Auth")).token:""
   dispatch({type:"GETUSER_REQUEST"})
   try{
      const response=await axios.get(`${Api_url}/apii/getallUser`,{
         headers:{
            authorization:tok
         }
      })
      dispatch({type:"GETUSER_SUCCESS",data:response.data})
   }catch (error){
      dispatch({type:"GETUSER_FAILED"})
       
   }
}

 export const followAction=(ids)=>async(dispatch)=>{
   const tok=JSON.parse(localStorage.getItem("Auth"))?JSON.parse(localStorage.getItem("Auth")).token:""
   dispatch({type:"FOLLOW_REQUEST"})
try{
   const response= await axios.post(`${Api_url}/apii/follow?id=${ids.id}`,{
    currentUserId:ids.currId
   },{
      headers:{
         authorization:tok
      }
   })

   dispatch({type:"FOLLOW_SUCCESS",data:response.data})
}catch{
   
   dispatch({type:"FOLLOW_FAILED"})
}
}

export const currentUser=()=>async(dispatch)=>{
   const tok=JSON.parse(localStorage.getItem("Auth"))?JSON.parse(localStorage.getItem("Auth")).token:""
   dispatch({type:"CURRENTUSER_REQUEST"})
   try{ 
      const userData=await useSelector((state)=>state.ReducerLogin?state.ReducerLogin.authdata?state.ReducerLogin.authdata.response:"nodata":"nodata")
      const getUsers=await useSelector((state)=>state.getAllUserReducer.data?state.getAllUserReducer.data?state.getAllUserReducer.data.result:[]:[])

      const currentUser=getUsers.filter((people)=>people._id.includes(userData._id))
      
       dispatch({type:"CURRENTUSER_SUCCESS",data:currentUser})
  
   }catch(error) {
      
      dispatch({type:"CURRENTUSER_FAILED"})
   }
}
