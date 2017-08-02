import React, { Component } from 'react'

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      location: '',
      limit: '20',
      placeHolder: 'Enter location',
      searchingLocation: false
    }
    this.getAddress = this.getAddress.bind(this)
    this.locationError = this.locationError.bind(this)
    this.getLocation = this.getLocation.bind(this)
  }

  getAddress(lat, long) {
    console.log(lat, long)
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyB80MQ7VcG-FH3q_VIjvG-6SZG52lqKNok`
    fetch(url)
      .then( response => response.json() )
      .then( json => this.setState({
        location: json.results[0].formatted_address,
        searchingLocation: false
      }))
  }

  onChangeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  onSubmitHandler(event) {
    event.preventDefault()
    this.props.retrieveBusinesses(this.state.location, this.state.term, this.state.limit)
  }

  onClickHandler() {
    this.setState({
      location: '',
      placeHolder: 'Fetching current location...',
      searchingLocation: true
    })
    this.getLocation()
  }

  getLocation() {
    window.navigator.geolocation.getCurrentPosition( pos => {
      console.log(pos.coords.latitude, pos.coords.longitude)
      this.getAddress(pos.coords.latitude, pos.coords.longitude)
    }, this.locationError)
  }

  locationError(error) {
    alert(`ERROR(${error.code}): ${error.message}`)
    this.setState({
      placeHolder: 'Enter location',
      searchingLocation: false
    })
  }

  //comment to make a change to see if heroku will update...

  render() {
    return (
      <div className='input-form'>
        {navigator.geolocation ? <button className='button' onClick={() => this.onClickHandler()}>Get Current Location</button> : null}
        <form onSubmit={(e) => this.onSubmitHandler(e)}>
          <input className='input' type='text' name='location' value={this.state.location} placeholder={this.state.placeHolder} onChange={(e) => this.onChangeHandler(e)}></input>
          <input className='input' id='term' type='text' name='term' value={this.state.term} placeholder='What are you looking for?' onChange={(e) => this.onChangeHandler(e)}></input>
          <select defaultValue='20' className='input' id='limit' name='limit' onChange={(e) => this.onChangeHandler(e)}>
            <option value='10'>10 rounds</option>
            <option value='20'>20 rounds</option>
            <option value='30'>30 rounds</option>
            <option value='40'>40 rounds</option>
          </select>
          {!this.state.term || !this.state.location || this.state.searchingLocation ? null : <input className='button' value='PLAY!' type='submit'/>}
        </form>
      </div>
    )
  }
}
