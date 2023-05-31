import React from 'react'
import './PostSide.css'
import TimeLine from './timeLine'
import Stories from './stories'

export default function Postside() {
  return (
    <div className='postside'>
      <Stories /> 
      <TimeLine />
    </div>
  )
}
