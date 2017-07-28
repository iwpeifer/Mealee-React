import React from 'react'

export default (props) => {
  return (
    <div className='business-reviews'>
      <p>out of </p>
      <div className='review-count'> {props.business.review_count} </div>
      <p> reviews</p>
    </div>
  )
}
