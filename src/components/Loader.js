import React from 'react'

export default (props) => {
  if (props.gameIsLoading) {
    return (
      <div id='preload-screen'>
        <div className='preload-header'>LOADING...</div>
      </div>
    )
  } else {
    return null
  }
}
