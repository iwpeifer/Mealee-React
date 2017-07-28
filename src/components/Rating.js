import React from 'react'

export default (props) => {
  let color
  props.business.rating > props.opponent.rating ? color = 'green' : color = 'black'
  if (props.business.rating > props.opponent.rating && props.business.review_count >= props.opponent.review_count / 2) {
    color = 'green'
  } else if (props.business.rating === props.opponent.rating && props.business.review_count > props.opponent.review_count) {
    color = 'green'
  } else {
    color = 'black'
  }

  return (
    <div className='business-rating' style={{color: color}}>
      {props.business.rating}
    </div>
  )
}
