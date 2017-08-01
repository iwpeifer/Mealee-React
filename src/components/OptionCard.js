import React from 'react'

import Rating from './Rating'
import Reviews from './Reviews'
import Info from './Info'

export default (props) => {

  let handleOnClick = () => {
    props.removeOption(props.which)
  }

  let handleOnClickLink = () => {
    window.open(props.business.url);
  }

  let displayImage = () => {
    let image_url = 'https://media2.giphy.com/media/PIbPrnuEpGEla/200.webp#26-grid1'
    if (props.business.image_url) {
      image_url = props.business.image_url
    }
    return <img className='business-image' alt={props.business.name} src={image_url} onClick={handleOnClickLink}/>
  }

  let displayButton = () => {
    if (!props.isWinner) {
      return <button className='yes-button' onClick={handleOnClick}>I’d rather go here!</button>
    } else {
      return <button className='yes-button' id='win' onClick={handleOnClickLink}>GO HERE!</button>
    }
  }

  return (
    <div className='option-card'>
      <div className='business-title'>{props.business.name}</div>
      {displayImage()}
      <Rating business={props.business} opponent={props.opponent}/>
      <Reviews business={props.business}/>
      <Info business={props.business} opponent={props.opponent}/>
      {displayButton()}
    </div>
  )
}
