import React, { useId, useRef, useState } from "react";
import "./postshare.css";
import { HiOutlinePhotograph } from "react-icons/hi";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { GrSchedulePlay } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from "@chakra-ui/toast";
import { postShareAction } from "../../actions/postAction";



export default function Postshare() {
  
  const [select,setSelect]=useState(true)
  const [finalshare,setFinalshare]=useState(false)
  const toast = useToast();
  const dispatch=useDispatch()
  const UserData=useSelector((state)=>state.ReducerLogin.authdata?state.ReducerLogin.authdata.response:"gfff")
  const username=UserData?UserData.username:""

  const userid=UserData?UserData._id:""
  
  const [image,setImage]=useState(false)
  const [pic,setPic]=useState(null)
  

  const sendata=async()=>{

    if(image!==null){
      setFinalshare(true)
      const data=await{pic,userid,username}
      await dispatch(postShareAction(data))
      setFinalshare(false)
    }else{
      toast({
        title: "pls select image first",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

  }


  const imageRef=useRef()
 

  const imgaeChange=async(event)=>{
     if(event.target.files && event.target.files[0]){
      let img= await event.target.files[0]
      setSelect(true)
      const data = await new FormData();
     await data.append("file", img);
     await data.append("api_secret", "LR8kreVQUMUnDQc3q2c7EC95yqg");
     await data.append("api_key", "425238981713824");
     await data.append("upload_preset", "chatting");
     await data.append("cloud_name", "amanchn");
    

     await fetch("https://api.cloudinary.com/v1_1/chatapp/image/upload", {
        method: "post",
        body: data,
      }) .then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString());
        setSelect(false)
        toast({
          title: "successfully selected imgae",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      })


      setImage({
        img:URL.createObjectURL(img)
      })
     }
  }
  
  
  return (
    <div className="searchPost">
      <div className="post">
        <img className="profileimg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMKDde33tiTi4IrbPLl1bHSfbJmSLV_YeyhguXAVRsNw&usqp=CAU&ec=48665699" />

        <input placeholder="#What is happening" type="text"></input>
      </div>
      <div className="postOptions">
        <div className="options" style={{color:'purple',cursor:'pointer'}} onClick={()=>imageRef.current.click()}>
          <HiOutlinePhotograph  />
          photo
        </div>
        <div className="options" style={{color:'lightgreen'}}>
          {" "}
          <AiOutlinePlayCircle />
          Video
        </div>
        <div className="options" style={{color:'orange'}}>
          <GoLocation />
          location
        </div>
        <div className="options" style={{color:'lightblue'}}>
          <GrSchedulePlay />
          schedule
        </div>
        <div className="options">
        {select?<Button variant="warning" disabled={true}>share</Button>:
        <Button variant="warning" onClick={sendata} >share</Button>}{finalshare?<h1 style={{color:"black",backgroundColor:"blueviolet"}}>Loading...</h1>:""} 
        <div>
          <input type="file" name="myimage" ref={imageRef} style={{display:'none'}} onChange={imgaeChange}></input>
        </div>
        </div>
      </div>
      {image && (
          <div className="imagePreview">
          <RxCross2 style={{cursor:'pointer'}} onClick={()=>setImage(null)}/>
            <img src={image.img} />
          </div>
        )}
    </div>
  );
}
