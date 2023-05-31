import React from 'react'
import './Home.css'
import Postside from '../components/postSide/Postside'
import Suggestion from './suggestion'

export default function Home() {
  return (
    <div className=' Home'>     
      <Postside className='postSide' />
      <div className='right' style={{borderLeft:"3px solid gray",backgroundColor:"rgb(52, 53, 54)"}}><Suggestion /></div>
    </div>
  )
}