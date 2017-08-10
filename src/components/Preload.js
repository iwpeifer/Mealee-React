import React from 'react'

export default (props) => {
  if (!props.gameIsLoading && !props.gameHasStarted) {
    return (
      <div id='preload-screen'>
        <div className='preload-header'>Feeling indecisive?</div>
        <div>Mealée makes it easy to find a place to spend your hard-earned 💰💰💰 by pitting local businesses against each other! Type in where you are and what you want, and let the games begin!</div>
      </div>
    )
  } else if (props.gameIsLoading) {
    return (
      <div id='preload-screen'>
        <div className='preload-header'>LOADING...</div>
      </div>
    )
  } else {
    return null
  }
}
