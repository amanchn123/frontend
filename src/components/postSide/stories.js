import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import './stories.css'
import MyStory from "./allstory";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";

import { Api_url } from "../../apiurl";

import axios from "axios";
import Allstory from "./allstory";
import { getstory } from "../../actions/postAction";
import { BsImages } from "react-icons/bs";

export default function Stories() {
  const [repeat, setRepeat] = useState();
  const [stor, setStor] = useState();
  const [no, setNo] = useState();

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
  const pic = mainUser ? mainUser.profilePic : "";
  const userId = userData ? userData._id : "bbbb";

  const toast = useToast();
  const navigate = useNavigate();
  const store = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const story = await e.target.files[0];
      const data = await new FormData();
      await data.append("file", story);
      await data.append("api_secret", "LR8kreVQUMUnDQc3q2c7EC95yqg");
      await data.append("api_key", "425238981713824");
      await data.append("upload_preset", "chatting");
      await data.append("cloud_name", "amanchn");

      await fetch("https://api.cloudinary.com/v1_1/chatapp/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then(async (data) => {
          await setStor(data.url.toString());
        });
    }
  };

  const share = async () => {
    const result = await axios
      .post(`${Api_url}/apii/createStory`, {
        userId: userData._id,
        story: stor,
      })
      .then(() =>
        toast({
          title: `You shared story succesful`,
          position: "top",
          isClosable: true,
        })
      )
      .then(() => navigate("/"));
  };

  const dispatch = useDispatch();
  const storyref = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const clear = () => {
    onClose();
    setStor("");
  };


  const [size, setSize] = React.useState("md");
  const handleSizeClick = (newSize) => {
    setSize(newSize);
    onOpen();
  };


  useEffect(() => {
    dispatch(getstory(userId));
  }, []);

  const storiess = useSelector((state) =>
    state.getstoryReducer ? state.getstoryReducer.data : []
  );

  const others = storiess ? storiess.otherstory : [];

  const mystoriess = storiess ? storiess.mystory : [];

  const clickss = () => {
    if (mystoriess?mystoriess.length !== 0:"") {
      handleSizeClick("full");
    } else {
      onOpen();
    }
  };

  const doc = [];
  const dup = [];

  return (
    <div
      className="mainbox"
      style={{  height: "100%",width:"85%", display: "flex",marginLeft:"80px",overflowX:"auto"}}
    >
      <div
        className="stories"
        style={{ display: "flex", width: "200%" }}
      >
      <div>
        <div
          onClick={clickss}
          className="mystory"
          style={{
            marginRight:"8px",
            height: "75%",
            width: "80px",
            backgroundImage: `url(${pic})`,
            backgroundSize: "73px",
            backgroundPosition: "center",
            backgroundRepeat:"none",
            border: "2px solid white",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
          }}
        >
          <input
            style={{ display: "none" }}
            type="file"
            onChange={store}
            ref={storyref}
          ></input>
          <span style={{}}>+</span>
          {mystoriess && mystoriess.length == 0 ? (
            <Modal isOpen={isOpen} onClose={clear}>
              <ModalOverlay />
              <ModalContent style={{ height: "70%" }}>
                <ModalHeader
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  Add Story{" "}
                  <span
                    onClick={share}
                    style={{
                      cursor: "pointer",
                      display: stor == null ? "none" : "flex",
                    }}
                  >
                    share story
                  </span>
                </ModalHeader>

                <ModalBody
                  style={{
                    backgroundColor: "blue",
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <BsImages
                    onClick={() => storyref.current.click()}
                    style={{
                      display: stor == null ? "grid" : "none",
                      cursor: "pointer",
                      position: stor == null ? "absolute" : "relative",
                      fontSize: "80px",
                      color: "white",
                    }}
                  />
                  <img style={{ height: "100%" }} src={stor} />
                </ModalBody>
              </ModalContent>
            </Modal>
          ) : (
            <Modal onClose={onClose} size={size} isOpen={isOpen}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{/* <Lorem count={2} /> */}</ModalBody>
                <ModalFooter>
                  <Button onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </div>
        <span style={{color:"white"}}>Your story</span>
        </div>
        <div
          className="allStory"
          style={{
            
            height: "100%",
            width: "100%",
            display: "flex",
          }}
        >
          {others.map((post, index) => {
            const user = getUsers.filter((name) => name._id == post.userId);
            const id = user ? (user[0] ? user[0]._id : "ff") : "noidd";
            doc.push(id);

            let findDuplicates = doc.filter(
              (item, index) => doc.indexOf(item) !== index
            );

            dup.push(findDuplicates);
               
           if(dup[index].includes(id)){
            return null
           }

            return (
              <Link to={{ pathname: "/story", search: `?id=${id}` }}>
                {" "}
                <div
                  style={{
                    height: "100px",
                    // backgroundColor: "purple",
                    display: "grid",
                    borderRadius:"50%",
                    // placeItems:"center",
                    // border: "2px solid white",
                    width: "90px",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  <img
                    style={{
                      height: "100%",
                      width: "75px",
                      borderRadius: "50%",
                      border: "3px solid white",
                      
                    }}
                    src={user ? (user[0] ? user[0].profilePic : "") : ""}
                  />
                  <div
                    style={{
                      color: "white",
                      // fontSize:"15px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user ? (user[0] ? user[0].username : "") : ""}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
