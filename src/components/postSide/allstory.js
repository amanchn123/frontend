import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getstory } from "../../actions/postAction";
import { getstoryReducer } from "../../reducers/postShareReducer";
import { useLocation } from "react-router-dom";
import Stories from "react-insta-stories";

export default function Allstory() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  const dispatch = useDispatch();

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
  const userId = userData ? userData._id : "bbbb";
  

  const storiess = useSelector((state) =>
    state.getstoryReducer ? state.getstoryReducer.data : ""
  );

  const others = storiess ? storiess.otherstory : [];
   

  useEffect(() => {
    dispatch(getstory(userId));
  }, []);

  const storrs=[{ url: 'https://picsum.photos/1080/1920', header: { heading: 'Mohit Karekar', subheading: 'Posted 5h ago', profileImage: 'https://picsum.photos/1000/1000' } }, { url: 'https://fsa.zobj.net/crop.php?r=dyJ08vhfPsUL3UkJ2aFaLo1LK5lhjA_5o6qEmWe7CW6P4bdk5Se2tYqxc8M3tcgYCwKp0IAyf0cmw9yCmOviFYb5JteeZgYClrug_bvSGgQxKGEUjH9H3s7PS9fQa3rpK3DN3nx-qA-mf6XN', header: { heading: 'Mohit Karekar', subheading: 'Posted 32m ago', profileImage: 'https://picsum.photos/1080/1920' } }, { url: 'https://media.idownloadblog.com/wp-content/uploads/2016/04/iPhone-wallpaper-abstract-portrait-stars-macinmac.jpg', header: { heading: 'mohitk05/react-insta-stories', subheading: 'Posted 32m ago', profileImage: 'https://avatars0.githubusercontent.com/u/24852829?s=400&v=4' } }, { url: 'https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4', type: 'video', duration: 1000 }, { url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', type: 'video' }, { url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', type: 'video' }, 'https://images.unsplash.com/photo-1534856966153-c86d43d53fe0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80']
  const storr = [];

  const storyContentStyle = {
    width: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto',
    backgroundColor:"green"
  };

  return (
    <div
      style={{
        display: "grid",
        height: "100%",
        width: "100vw",
        placeContent: "center",
        backgroundColor: "green",
      }}
    >
      {others
        .filter((ele) => ele.userId == id)
        .map((post) => {
          const userDet = getUsers.filter((naam) => naam._id === id);

          storr.push(...storr, {
            url: post ? post.story : "",
            header: {
              heading: userDet[0] ? userDet[0].username : "",
              subheading: post.createdAt,
              profileImage: userDet[0] ? userDet[0].profilePic : "",
            },
          });


          return (
            <div>

            </div>
          );
        })}
        <Stories 
                stories={storr!==[]?storr:storrs}
                defaultInterval={500}
                width={432}
                height={768}
              />
    </div>
  );
}
