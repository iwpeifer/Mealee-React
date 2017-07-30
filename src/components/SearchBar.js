import React, { Component } from 'react'

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      location: ''
    }
    this.getAddress = this.getAddress.bind(this)
  }

  // componentWillMount() {
  //   window.navigator.geolocation.getCurrentPosition( pos => {
  //     console.log(pos.coords.latitude, pos.coords.longitude)
  //     this.getAddress(pos.coords.latitude, pos.coords.longitude)
  //   })
  // }

  // getZipCode(lat, long) {
  //   let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyB80MQ7VcG-FH3q_VIjvG-6SZG52lqKNok`
  //   fetch(url)
  //     .then( response => response.json() )
  //     .then( json => this.setState({
  //       location: json.results[0].address_components[7].short_name
  //     }))
  // }

  getAddress(lat, long) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyB80MQ7VcG-FH3q_VIjvG-6SZG52lqKNok`
    fetch(url)
      .then( response => response.json() )
      .then( json => this.setState({
        location: json.results[0].formatted_address
      }))
  }

  onChangeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  onSubmitHandler(event) {
    event.preventDefault()
    this.props.retrieveBusinesses(this.state.location, this.state.term)
  }

  onClickHandler() {
    this.setState({

    })
    window.navigator.geolocation.getCurrentPosition( pos => {
      console.log(pos.coords.latitude, pos.coords.longitude)
      this.getAddress(pos.coords.latitude, pos.coords.longitude)
    })
  }

  render() {
    return (
      <div className='input-form'>
        <button className='button' onClick={() => this.onClickHandler()}>Get Current Location</button>
        <form onSubmit={(e) => this.onSubmitHandler(e)}>
          <input className='input' type='text' name='location' value={this.state.location} placeholder='location' onChange={(e) => this.onChangeHandler(e)}></input>
          <input className='input' id='term' type='text' name='term' value={this.state.term} placeholder='What are you looking for?' onChange={(e) => this.onChangeHandler(e)}></input>
          {!this.state.term || !this.state.location ? null : <input className='button' type='submit'/>}
        </form>
      </div>
    )
  }
}
