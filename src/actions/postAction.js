import axios from "axios";
import React from "react";
import { Api_url } from "../apiurl";

export const postShareAction=(data)=>async (dispatch)=>{
   const tok=JSON.parse(localStorage.getItem("Auth"))?JSON.parse(localStorage.getItem("Auth")).token:""
    dispatch({type:"POSTSHARE_REQUEST"})

    try{
       const response=await axios.post(`${Api_url}/apii/newPost`,{
         userId:data.userid,
         image:data.pic,
         username:data.username,
         desc:data.alpha
       },{
         headers:{
            authorization:tok
    }})

       dispatch({type:"POSTSHARE_SUCCESS",data:response.data})
    }catch{
       dispatch({type:"POSTSHARE_FAILED"})
    }
}

export const currentUserPost=(id)=>async(dispatch)=>{
   const tok=JSON.parse(localStorage.getItem("Auth"))?JSON.parse(localStorage.getItem("Auth")).token:""
   dispatch({type:"GETPOST_REQUEST"})
   try{
      const response=await axios.get(`${Api_url}/apii/getpost?userId=${id}`,{
         headers:{
            authorization:tok
         }
      })
       
      dispatch({type:"GETPOST_SUCCESS",data:response})
   }catch (error){
        dispatch({type:"GETPOST_FAILED"})
   }
}

export const deletePost=(id)=>async(dispatch)=>{
   const tok=JSON.parse(localStorage.getItem("Auth"))?JSON.parse(localStorage.getItem("Auth")).token:""
   dispatch({type:"DELETEPOST_REQUEST"})
   try{
        const response=await axios.post(`${Api_url}/apii/deletepost`,{id:id},{
         headers:{
            authorization:tok
         }
        })
       
        dispatch({type:"DELETEPOST_SUCCESS"})
   }catch{
       dispatch({type:"DELETEPOST_FAILED"})
   }
}

export const createStory=(data)=>async(dispatch)=>{
   dispatch({type:"CREATESTORY_REQUEST"})
   try{
      const response=await axios.post(`${Api_url}/apii/createStory`,{
         story:data.story,
         userId:data.userId
      })
    
      dispatch({type:"CREATESTORY_SUCCESS"})
   }catch(error){
      dispatch({type:"CREATESTORY_FAIL"})
 
   }
}

export const getstory=(userId)=>async(dispatch)=>{
   dispatch({type:"GETSTORY_REQUEST"})
   try{
      
      const response=await axios.get(`${Api_url}/apii/stories?userId=${userId}`)
      const otherstory= await response?response.data?response.data.others:[]:[] 
      const mystory=await response?response.data?response.data.my:[]:[]
     dispatch({type:"GETSTORY_SUCCESS",data:{otherstory,mystory}})

   }catch{
      dispatch({type:"GETSTORY_FAIL"})
 
   }
 }