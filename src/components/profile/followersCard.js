import React, { useEffect,useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { followerData } from '../../actions/authAction'

export default function FollowersCard() {
  const [follow, setFollow] = useState([]);
  const followersId=useSelector((state)=>state.ReducerLogin.authdata?state.ReducerLogin.authdata.response?state.ReducerLogin.authdata.response.followers:[]:[])
  // console.log("iddd",followersId)
  const dispatch=useDispatch()


  useEffect(()=>{

        dispatch(followerData(followersId)) 
        // console.log('eachid',id)

  },[dispatch,followersId])


  // useEffect(()=>{
  //   setFollow(mains)
  // },[])


  const followers=useSelector((state)=>state.getFollower.data?state.getFollower.data:[])


  return (
    <div className='followerCard'key={followers._id}>
      {followers.length!==0?(
        followers.map((names)=>{
        return(
          <div style={{display:'grid'}}>
            {names.username}
          </div>
        )
      })
      ):"No follower"}
    </div>
  )
}