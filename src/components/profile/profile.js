import React from 'react'
import Logosearch from './logosearch'
import ProfileCard from './profileCard'
import './profile.css'
import FollowersCard from './followersCard'


export default function Profile() {
  return (
    <div className='profile'>
      <Logosearch />
      {/* <ProfileCard />
       <FollowersCard /> */}
    </div>
  )
}
