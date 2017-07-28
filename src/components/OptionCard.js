import React from 'react'

import Rating from './Rating'
import Reviews from './Reviews'

export default (props) => {
  return (
    <div className='option-card'>
      <h3 className='business-title'>{props.business.name}</h3>
      <img className='business-image' src={props.business.image_url}/>
      <Rating business={props.business}/>
      <Reviews business={props.business}/>
    </div>
  )
}
