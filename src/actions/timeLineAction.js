import axios from "axios";
import { useSelector } from "react-redux";


export const timeLine=(userId)=>async(dispatch)=>{
   // const userId=useSelector((this.state.))
    dispatch({type:"TIMELINE_REQUEST"})
    
 }