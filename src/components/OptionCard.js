import React from 'react'

import Rating from './Rating'
import Reviews from './Reviews'

export default (props) => {

  let handleOnClick = () => {
    props.removeOption(props.which)
  }

  return (
    <div className='option-card'>
      <div className='business-title'>{props.business.name}</div>
      <img className='business-image' src={props.business.image_url}/>
      <Rating business={props.business} opponent={props.opponent}/>
      <Reviews business={props.business}/>
      <button className='yes-button' onClick={handleOnClick}>I’d rather go here!</button>
    </div>
  )
}
