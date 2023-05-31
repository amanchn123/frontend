import React, { useEffect } from "react";
import "./profileCard.css";
import {useSelector} from 'react-redux'
import { Link } from "react-router-dom";


export default function ProfileCard() {

  
  const userData=useSelector((state)=>state.ReducerLogin?state.ReducerLogin.authdata?state.ReducerLogin.authdata.response:"nodata":"nodata")
  const getUsers=useSelector((state)=>state.getAllUserReducer.data?state.getAllUserReducer.data?state.getAllUserReducer.data.result:[]:[])
  
  const currentUser=getUsers.filter((people)=>people._id.includes(userData._id))
  const mainUser=currentUser?currentUser[0]:""


  return (
    <div className="ProfileCard">
      <div className="profileImages">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLlp4pJ7hE943JdMiRbU6CvsBPLEHTe9Lhu6FpPykJxg&s"></img>
        <img src={mainUser?mainUser.profilePic:""}></img>
      </div>
      <div className="profileName">
        <span>{mainUser?mainUser.username:""}</span>
        <span>Full stack web developer</span>
      </div>

      <div className="followstatus">
        <hr />
        <div className="flo">
          <div className="follow">
            <span>{mainUser?mainUser.followers?mainUser.followers.length:"":""}</span>
            <span>follwers</span>
          </div>
          <div className="vl">
            <span></span>
          </div>

          <div className="following">
            <span>{mainUser?mainUser.following?mainUser.following.length:"":""}</span>
            <span>following</span>
          </div>
        </div>
        <hr />
      </div>
      <span><Link to="/profilepage">My Profile</Link></span>
    </div>
  );
}
