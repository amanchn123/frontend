import { border } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Suggestion() {
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
  return (
    <div
      style={{
        width: "100%",
        
        justifyContent: "center",
        padding: "50px 0px 0px 10px",
      }}
    >
      <div
        className="row"
        style={{ color: "white", width: "100%", padding: "px", height: "auto" }}
      >
        <div
          className="col-sm-12"
          style={{ display: "flex",  placeItems: "center" }}
        >
          <img
            style={{ height: "70px", width: "70px", borderRadius: "50%" }}
            src={mainUser ? mainUser.profilePic : ""}
          />
          &nbsp; <span style={{display:"grid",fontSize: "20px",}}>{mainUser ? mainUser.username : ""}<p style={{fontSize:"15px"}}>{mainUser ? mainUser.firstName : ""}&nbsp;{mainUser ? mainUser.lastName : ""}</p></span>{" "}
        </div>
      </div>
      <br />
      <div style={{color:"white"}} className="row"><span>Suggested for you</span></div>
    </div>
  );
}
