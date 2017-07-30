import React from 'react'

export default (props) => {

  let walkTime = Math.round(props.business.distance / 70)

  let displayWalkTime = () => {
    let color
    if (props.business.distance < props.opponent.distance) {
      color = 'rgb(73,167,76)'
    } else {
      color = 'rgb(55,55,55)'
    }
    if (walkTime > 60) {
      return <p style={{color: color}}>{Math.round((walkTime / 60) * 100) / 100} hour walk</p>
    } else {
      return <p style={{color: color}}>{walkTime} minute walk</p>
    }
  }

  let displayPrice = () => {
    if (props.business.price) {
      let splitPrice = props.business.price.split('')
      let newSplitPrice = splitPrice.map(dollarSign => '💰')
      return newSplitPrice.join('')
    }
  }

  let displayAddress = () => {
    if (props.business.location) {
      if (props.business.location.address1) {
        return <p>{props.business.location.address1}, {props.business.location.city}</p>
      } else if (props.business.location.city) {
        return <p>{props.business.location.city}</p>
      }
    }
  }

  return (
    <div className='business-info'>
      <p className='walk-time'>{displayWalkTime()}</p>
      <p>{displayAddress()}</p>
      <p className='price'>{displayPrice()}</p>
    </div>
  )
}
