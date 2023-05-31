import React, { useEffect,useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/authAction";
import { currentUserPost, deletePost } from "../../actions/postAction";
import "./profilePage.css";
import { FcLike } from "react-icons/fc";
import { SlOptions } from "react-icons/sl";
import "./profilePage.css";
import Button from "react-bootstrap/Button";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import axios from "axios";
import { Api_url } from "../../apiurl";
import { useNavigate } from "react-router-dom";


export default function Profilepage() {
  const[prof,setProf]=useState(false)
  const[pic,setPic]=useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate=useNavigate()
 const pro=useRef()
   
 const getImg=async(e)=>{
    if(e.target.files && e.target.files[0]){
       const img=await e.target.files[0]
       const data=await new FormData()
       await data.append("file",img)
       await data.append("api_secret", "LR8kreVQUMUnDQc3q2c7EC95yqg")
       await data.append("api_key", "425238981713824");
       await data.append("upload_preset", "chatting");
       await data.append("cloud_name", "amanchn")
        
       await fetch("https://api.cloudinary.com/v1_1/chatapp/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then(async(data) => {
          
            await setPic(data.url.toString());
            const result=await axios.post(`${Api_url}/apii/updateprofile?id=${userData._id}`,{
              currentUser:userData._id,
              profilePic:data.url.toString()
            })
        }).then(()=>setProf(true))
    }else{
      alert("lllll")
    }
 }


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(currentUserPost(userData._id));
  }, []);

  const userData = useSelector((state) =>
    state.ReducerLogin
      ? state.ReducerLogin.authdata
        ? state.ReducerLogin.authdata.response
        : "nodata"
      : "nodata"
  );
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

  const post = useSelector((state) =>
    state.currentPost ? state.currentPost.data : ""
  );

  return (
    <div
      className="row"
      style={{
        backgroundColor: "black",
        padding: "10px",
        margin: "0%",
        borderLeft: "2px solid grey",
      }}
    >
      <div className="col-sm-12">
        <div style={{ height: "auto" }}>
          <div
            className="row"
            style={{ justifyContent: "center", padding: "60px" }}
          >
            <div 
              className="col-sm-3"
              style={{ display: "flex", placeContent: "end", padding: "20px", cursor:"pointer",borderRadius:"50%"}}
            >
              <OverlayTrigger  placement="bottom" overlay={<Tooltip id="tooltip-disabled">Change profile Pic</Tooltip>}>
      <span className="d-inline-block" onClick={onOpen}>
        <Button style={{ pointerEvents: 'none',border:"none",backgroundColor:"black" }}>
        <img    
                src={pic!==null?pic:mainUser ? mainUser.profilePic : ""}
                style={{
                 
                  height: "100%",
                  borderRadius: "50%",
                  marginRight: "0%",
                  display: "grid",
                  justifyContent: "center",
                }}
                alt="ssss"
              />
        </Button>
      </span>
    </OverlayTrigger>

    <Modal isOpen={isOpen} onClose={onClose}  >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={{display:"grid",justifyItems:"center"}}>change profile pic</ModalHeader>
          <hr />
          <ModalBody style={{display:"grid",justifyItems:"center",cursor:"pointer"}} onClick={()=>pro.current.click()} >
            <b>Update Profile Pic</b>
            <input onChange={getImg} style={{display:"none"}} type="file" ref={pro} ></input>
          </ModalBody>
          
          <ModalFooter style={{display:"grid",justifyItems:"center"}}>
            <span style={{cursor:"pointer"}}  onClick={onClose}>
              cancel
            </span>
          </ModalFooter>
        </ModalContent>
      </Modal>
            </div>
            <div
              className="col-sm-8"
              style={{ display: "grid", color: "white", fontSize: "20px" }}
            >
              <div
                className="row"
                style={{ display: "flex", placeItems: "end" }}
              >
                <h3>
                  {mainUser ? mainUser.username : "rfr"} &nbsp;{" "}
                  <Button
                    variant="primary"
                    style={{ backgroundColor: "wheat", color: "black" }}
                  >
                    Edit Profile
                  </Button>{" "}
                  &nbsp;
                  <Button
                    variant="primary"
                    style={{ backgroundColor: "wheat", color: "black" }}
                  >
                    Ad tool
                  </Button>
                  &nbsp;{" "}
                </h3>
              </div>
              <div
                className="row"
                style={{ display: "flex", placeItems: "center" }}
              >
                <div className="following">
                  <h4>
                    {post ? post.length : ""} Post &nbsp;&nbsp;{" "}
                    {mainUser ? mainUser.followers.length : ""} Followers
                    &nbsp;&nbsp;&nbsp;{" "}
                    {mainUser ? mainUser.following.length : ""} Following
                  </h4>
                </div>
              </div>
              <div
                className="row"
                style={{ display: "flex", placeItems: "start" }}
              >
                <h5>Hi I am aman chouhan and I</h5>
              </div>
            </div>
          </div>
          <hr style={{ backgroundColor: "white", border: "2px solid white" }} />

          <div
            className="row"
            style={{
              backgroundColor: "black",
              justifyContent: "center",
              margin: "0%",
              padding: "15px",
              border: "3px solid black",
            }}
          >
            {post
              ? post.length !== 0
                ? post
                  ? post.map((people) => {
                      return (
                        <div
                          className="col-sm-3 container"
                          style={{
                            backgroundColor: "blue",
                            margin: "5px",
                            height: "200px",
                            padding: "0%",
                            width: "200px",
                          }}
                        >
                          <img
                            src={people ? people.image : ""}
                            style={{ width: "100%", height: "100%" }}
                          />
                          <div className="overlay">
                            <div className="content">
                              <h3>
                                {people ? people.likes.length : ""} <FcLike />
                                <span
                                  onClick={() =>
                                    dispatch(
                                      deletePost(people ? people._id : "")
                                    )
                                  }
                                  style={{
                                    position: "absolute",
                                    top: "-100px",
                                    right: "-55px",
                                    opacity: "1",
                                  }}
                                >
                                  <SlOptions />
                                </span>
                              </h3>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : "ede"
                : "ccc"
              : "no image"}
          </div>
        </div>
      </div>
    </div>
  );
}
