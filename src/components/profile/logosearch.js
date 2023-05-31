import React, { useEffect, useState } from "react";
import "./logosearch.css";
import { AiOutlineTwitter } from "react-icons/ai";
import { GoSearch } from "react-icons/go";
import { NavLink, json } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser, followAction } from "../../actions/authAction";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function Logosearch() {
  const [user, setUser] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  });

  const userData = useSelector((state) =>
    state.ReducerLogin.authdata
      ? state.ReducerLogin.authdata.response
      : "nodata"
  );

  const followaction = (id) => {
    const ids = { id, currId: userData._id };
    dispatch(followAction(ids));
  };

  const getUsers = useSelector((state) =>
    state.getAllUserReducer.data
      ? state.getAllUserReducer.data
        ? state.getAllUserReducer.data.result
        : []
      : []
  );


  return (
    <div className="Logosearch">
      <div className="in">
        <span>
          <NavLink to="/">
            <AiOutlineTwitter style={{ height: "3rem", width: "40px" }} />{" "}
          </NavLink>{" "}
        </span>
        &nbsp;&nbsp;
        <div className="searchinput">
          <input
            type="text"
            placeholder="#search"
            onChange={(e) => setUser(e.target.value)}
          ></input>
          <div className="s-icons">
            <GoSearch />
          </div>
        </div>
      </div>
      <div className="names">
        {user !== ""
          ? getUsers
              .filter((names) => names.username.includes(user))
              .map((naam) => {
                return (
                  <div
                    className="naam row"
                    style={{ display: "flex", marginBottom: "6px" }}
                  >
                    <div
                      className="col-sm-8"
                      style={{ display: "flex", fontSize: "20px" }}
                    >
                      <img
                        style={{ height: "35px", borderRadius: "50%" }}
                        src={naam.profilePic}
                      />
                      &nbsp; {naam.username}&nbsp;
                    </div>
                    <div className="col-sm-4">
                      {Object.values(naam.followers).includes(userData._id) ? (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => followaction(naam._id)}
                        >
                          following
                        </Button>
                      ) : (
                        <Button
                          style={{ right: "0px" }}
                          variant="light"
                          size="sm"
                          onClick={() => followaction(naam._id)}
                        >
                          follow
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })
          : ""}
      </div>
    </div>
  );
}
