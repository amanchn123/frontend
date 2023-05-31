import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./timeLine.css";
import { Container, Row } from "react-bootstrap";
import {FcLike} from 'react-icons/fc'
import { getUser } from "../../actions/authAction";
import { Api_url } from "../../apiurl";



export default function TimeLine() {
  const tok = JSON.parse(localStorage.getItem("Auth"))
  ? JSON.parse(localStorage.getItem("Auth")).token
  : "";




  const userData = useSelector((state) =>
    state.ReducerLogin
      ? state.ReducerLogin.authdata
        ? state.ReducerLogin.authdata.response
        : "nodata"
      : "nodata"
  );

  useEffect(()=>{
      dispatch(getUser())
  },[])

  
  const getUsers = useSelector((state) =>
    state.getAllUserReducer.data
      ? state.getAllUserReducer.data
        ? state.getAllUserReducer.data.result
        : []
      : []
  );


  const currentUser = getUsers.filter((people) =>
    people._id.includes(userData._id)
  );
  const mainUser = currentUser ? currentUser[0] : "";

  const [post, setPost] = useState([]);
  const dispatch = useDispatch();
  const postID = useSelector((state) =>
    state.ReducerLogin.authdata
      ? state.ReducerLogin.authdata.response
        ? state.ReducerLogin.authdata.response._id
        : ""
      : "k"
  );

  useEffect(()=>{
    getPost()
  },[postID])

  const likes=async(id)=>{
    try{
      const response=await axios.put(`${Api_url}/apii/likes?id=${id}`,{
        currentUserId:postID
      },{
        headers:{
          authorization:tok
        }
      })

    }catch{
     
    }
  }

  const getPost = async () => {
    try {
      const respose = await axios.get(
        `${Api_url}/apii/timelinePost?userId=${postID}`,
        {
          headers: {
            authorization: tok,
          },
        }
      );
      setPost(respose.data);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className=" maincontainers" style={{width:"80%",marginLeft:"80px",padding:"30px"}}>
      {post.length !== 0
        ? post.map((ele) => {
            const all = getUsers.filter((person) =>
              person._id.includes(ele.userId)
            );

            return (
              <div className="shadow-2xl"
                style={{padding:"20px",width: "100%",justifyContent:"center",display:"grid", borderRadius: "5px", marginTop: "15px",boxShadow:"inset 0 0 10px #000000" }}
              >
                <div
                  className="Row"
                  style={{
                    display:"flex",
                    height:"100%",
                    width:"50%",
                    placeItems:"center", 
                    color:"white",
                    placeItems: "center",
                    fontSize:"20px",
                    marginBottom:"3%"
                  }}
                >
                  <img
                    src={all[0] ? all[0].profilePic : ""}
                    style={{
                      height: "20px",
                      width: "auto",
                      position: "relative",
                      borderRadius: "50%",
                    }}
                  /> &nbsp;
                  <span>{ele.username}</span>
                </div>
                <div className="shadow-2xl" style={{ width: "100%",display:"grid" }}>
                  <img style={{ width: "100%" }} src={ele.image} />
                  <div>
                  <span onClick={()=>likes(ele._id)} style={{display:"flex",placeItems:"center",fontSize:"120%",cursor:"pointer",color:"white"}}><FcLike />{ele.likes.length}</span>
                  <span style={{color:"white"}}><b>{ele.username}</b> &nbsp;{ele.desc} </span>
                </div>
                </div>
                <hr style={{color:"white",backgroundColor:"white",border:"3px solid white"}}/>
              </div>
            );
          })
        : ""}
    </div>
  );
}