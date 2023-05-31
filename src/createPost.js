import React, { useEffect, useRef, useState } from "react";
import { BiImages } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/toast";
import { postShareAction } from "./actions/postAction";
import { GrLinkNext } from "react-icons/gr";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [disabled, setDisabled] = useState(false);
  const [nextdisable, setNextdisable] = useState(false);
  const[done,setDone]=useState(false)

  const [alpha, setAlpha] = useState(0);

  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const toast = useToast();
  const UserData = useSelector((state) =>
    state.ReducerLogin.authdata ? state.ReducerLogin.authdata.response : "gfff"
  );
  const username = UserData ? UserData.username : "";

  const userid = UserData ? UserData._id : "";
  const postref = useRef();
  const [pic, setPic] = useState("");

  const handleimg = () => {
    setDisabled(true);
    setNextdisable(true);
  };
  const navigate=useNavigate()

  const sendata = async () => {
    const data = await { pic, userid, username,alpha };

    await dispatch(postShareAction(data)).then(()=>{
       toast({
        title: `You shared post succesful`,
        position: "top",
        isClosable: true,
      })
    }).then(()=>navigate('/')).then(()=>setDone(true))
    
  };

  const handleClick = (event) => {
    imageSelect(event);
    handleimg();
  };

  const imageSelect = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = await event.target.files[0];

      const data = await new FormData();
      await data.append("file", img);
      await data.append("api_secret", "LR8kreVQUMUnDQc3q2c7EC95yqg");
      await data.append("api_key", "425238981713824");
      await data.append("upload_preset", "chatting");
      await data.append("cloud_name", "amanchn");

      await fetch("https://api.cloudinary.com/v1_1/chatapp/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        });
    } else {
      alert("pls select image");
    }
  };

  const nextSlide = () => {
    // Increment the current slide index
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };

  const backSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  const slides = [
    // Array of slide content or components
    <div
      style={{
        backgroundColor: "grey",
        height: "100%",
        width: "100%",
        display: "grid",
        placeItems: "center",
        margin: "0%",
      }}
    >
      {" "}
      <div
        className="row"
        style={{
          // backgroundColor:"red",
          position: "relative",
          top: "-45%",
          width: "100%",
          // top: "0px",
          placeItems: "center",
          display: disabled ? "none" : "flex",
        }}
      >
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            position: "center",
          }}
        >
          Create Post
        </span>
      </div>
      <div
        className="row"
        style={{
          // backgroundColor:"black",
          width: "100%",
          top: "3%",
          display: disabled ? "flex" : "none",
          position: "absolute",
        }}
      >
        <span style={{ display: "flex", justifyContent: "center" }}>
          Crop post
        </span>
      </div>
      <div
        className="row"
        style={{
          position: "absolute",
          width: "100%",

          top: "7%",
          display: disabled ? "flex" : "none",
          justifyContent: "end",
          color: "white",
        }}
      >
        <span
          onClick={nextSlide}
          style={{
            backgroundColor: "white",
            cursor: "pointer",
            width: "40px",
            borderRadius: "6px",
            color: "white",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <GrLinkNext />{" "}
        </span>
      </div>
      <span
        style={{
          // color: "white",
          fontSize: "90px",
          marginTop: "0%",
          cursor: "pointer",
          placeItems: "center",
          display: disabled ? "none" : "grid",
        }}
        onClick={() => postref.current.click()}
      >
        {" "}
        <BiImages />{" "}
        <span style={{ fontSize: "30px" }}>select from device</span>
      </span>
      <input
        style={{ display: "none" }}
        type="file"
        ref={postref}
        onChange={handleClick}
      ></input>
      <div
        className="row"
        style={{
          width: "80%",
          height: "90%",
          display: disabled ? "grid" : "none",
          placeItems: "center",
          backgroundColor:"greenyellow"
        }}
      >
        <img style={{ height: "400px", width: "500px" }} src={pic}></img>
      </div>
    </div>,
    <div className="row" style={{ height: "100%", width: "100%" }}>
      <div
        className="col-sm-6"
        style={{
          width: "100%",
          top: "0px",
          height: "2rem",
          display: "grid",
          fontSize: "200%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <BiArrowBack style={{ cursor: "pointer" }} onClick={backSlide} />
        <span
        onClick={sendata}
          style={{
            fontSize: "50%",
            border: "1px solid black",
            padding: "10px",
            borderRadius: "10px",
            placeItems:"center",
            display:"flex",
            marginTop:"5px",
            cursor:"pointer"
          }}
        >
          SHARE
        </span>
      </div>
      <div
        className="col-sm-7"
        style={{
          display: "grid",
          backgroundColor: "grey",
          placeItems: "center",
          margin: "0px",
        }}
      >
        <div style={{ height: "90%", width: "80%" }}>
          <img style={{ height: "400px", width: "400px" }} src={pic} />{" "}
        </div>
      </div>
      <div
        className="col-sm-5"
        style={{ backgroundColor: "grey", display: "grid" }}
      >
        <div
          style={{
            display: "flex",
            height: "3rem",
            placeItems: "center",
          }}
        >
          <img
            style={{ height: "80%", borderRadius: "50%" }}
            src={UserData ? UserData.profilePic : ""}
          />
          <span>{UserData ? UserData.username : ""}</span>
        </div>
        <div style={{ maxHeight: "auto", display: "grid" }}>
          <textarea
            id="muInput"
            placeholder="write caption..."
            maxLength="250"
            spellCheck="false"
            onChange={(e) => setAlpha(e.target.value)}
            style={{
              padding: "10px",
              height: "150px",
              width: "100%",
              backgroundColor: "black",
              color: "white",
              outline: "none",
              borderRadius: "5px",
            }}
            type="text"
          ></textarea>
          <span>{alpha.length ? alpha.length : "0"}</span>
        </div>
      </div>
    </div>,
    <div>Slide 3</div>,
    // ...more slides
  ];

  return (
    <div
      style={{
        backgroundColor: "grey",
        color: "white",
        display: "grid",
        placeItems: "center",
        margin: "0px",
        height: "500px",
        height: "500px",
        left: "0px",
        position: "absolute",
        // padding:"10px",
        border: "1px solid black",
        width: currentSlide > 0 ? "800px" : "500px",
        // placeItems:"center"
      }}
    >
      {slides[currentSlide]}
    </div>
  );
}
