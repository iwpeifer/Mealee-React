import React from 'react'

export default (props) => {

  let walkTime = Math.round(props.business.distance / 70)

  let displayWalkTime = () => {
    if (walkTime > 60) {
      return <p>{Math.round((walkTime / 60) * 100) / 100} hour walk</p>
    } else {
      return <p>{walkTime} minute walk</p>
    }
  }

  let displayPrice = () => {
    if (props.business.price) {
      let splitPrice = props.business.price.split('')
      let newSplitPrice = splitPrice.map(dollarSign => '💰')
      return newSplitPrice.join('')
    }
  }

  return (
    <div className='info'>
      {displayWalkTime()}
      {displayPrice()}
    </div>
  )
}
