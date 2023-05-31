import "./App.css";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Auth from "./pages/auth";
import { ChakraProvider, LinkBox } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Profilepage from "./pages/profile/profilePage.js";
import { AiFillHome } from "react-icons/ai";
import { ImSearch } from "react-icons/im";
import { IoMdCompass } from "react-icons/io";
import { BsCameraReels } from "react-icons/bs";
import { BiMessageRoundedDots } from "react-icons/bi";
import { GrNotification } from "react-icons/gr";
import { BsPlusSquare } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { CgMenu } from "react-icons/cg";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Logosearch from "./components/profile/logosearch";
import {GrClose} from 'react-icons/gr'
import Modal from 'react-bootstrap/Modal';
import CreatePost from "./createPost";


export default function Sidebar() {

    let checkUser = useSelector((state) => state.ReducerLogin.authdata);

    const navigate=useNavigate()
    const logout=async()=>{
     await localStorage.clear()
     navigate('/auth')
    }
  
  
    const [showcreate, setShowcreate] = useState(false);
    const handleClosecreate = () => setShowcreate(false);
    const handleShowcreate = () => setShowcreate(true);
    
  
    const options=  {
      name: 'Enable both scrolling & backdrop (default)',
      scroll: true,
      backdrop: false,
    }
  
    const name="Enable both scrolling & backdrop" 


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    const handleShow=()=>setShow(true)

  return (
    <div className="col-sm-2 first" style={{ padding:"10px",backgroundColor:"rgb(52, 53, 54)", }}>
        <Link to="/" className="logo" style={{placeItems:"center" ,padding:"30px",margin:"0%"}}>
            <img src="https://cdn.kibrispdr.org/data/105/download-logo-instagram-putih-png-42.png" />
          </Link>
          <div className="sections" style={{display:"grid",justifyContent:"space-around",color:"white"}}>
         
           <NavLink to="/"> <span style={{display:"flex", placeItems:"center",fontSize:"150%",marginTop:"3px",border:"none"}}><AiFillHome />&nbsp;Home</span></NavLink>
           <span activeStyle={{ color:"black" }} style={{display:"flex", placeItems:"center",fontSize:"150%",marginTop:"3px",cursor:"pointer"}} onClick={toggleShow}><ImSearch />&nbsp;Search</span>
           
           <Offcanvas show={show} onHide={handleClose} {...options} style={{marginLeft:"80px",backgroundColor:"rgb(75, 82, 82)",color:"white"}}>
        <Offcanvas.Header  >
          <Offcanvas.Title>Search User</Offcanvas.Title>
          <span onClick={handleClose} variant="" style={{color:"white",cursor:"pointer"}} >
             <GrClose  />
          </span>
        </Offcanvas.Header>
        <Offcanvas.Body>
           <Logosearch />
        </Offcanvas.Body>
      </Offcanvas>
            
            <span style={{display:"flex", placeItems:"center",fontSize:"150%",marginTop:"3px"}}><IoMdCompass />&nbsp;explore</span>
            <span style={{display:"flex", placeItems:"center",fontSize:"150%",marginTop:"3px"}}><BiMessageRoundedDots />&nbsp;Messages</span>
            <span style={{display:"flex", placeItems:"center",fontSize:"150%",marginTop:"3px"}}><MdOutlineNotificationsNone />&nbsp;Notification</span>
            <span style={{display:"flex", placeItems:"center",fontSize:"150%",marginTop:"3px",cursor:"pointer"}} onClick={handleShowcreate}><BsPlusSquare />&nbsp;create</span>
            <NavLink to='/profilepage'> <span style={{display:"flex", placeItems:"center",fontSize:"150%",marginTop:"3px"}}><CgProfile />&nbsp;Profile</span></NavLink>
          </div>
          <div style={{color:"white",alignItems:"center",marginTop:"60px"}}>
          <span style={{fontSize:"150%",display:"flex",placeItems:"center",padding:"0px 40px"}}><CgMenu />&nbsp;more</span>
          <span style={{fontSize:"150%",display:"flex",placeItems:"center",padding:"0px 40px",cursor:"pointer"}} onClick={logout}>Logout</span>
          </div>
          <Modal  show={showcreate} onHide={handleClosecreate} >
                     <CreatePost />
          </Modal>
        </div>
  )
}
