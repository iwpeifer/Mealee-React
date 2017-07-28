import React from 'react'

export default (props) => {
  return (
    <div className='business-reviews'>
      out of {props.business.review_count} reviews
    </div>
  )
}
