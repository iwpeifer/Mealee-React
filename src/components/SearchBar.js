import React, { Component } from 'react'

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      location: '',
      limit: '20',
      priceLow: '1',
      priceHigh: '4',
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

  onChangeHandlerPriceLow(event) {
    this.onChangeHandler(event)
      if (event.target.value > this.state.priceHigh){
      this.setState({
        priceHigh: event.target.value,
      })
    }
  }

  onSubmitHandler(event) {
    event.preventDefault()
    let formattedPrice = this.formatPrice(this.state.priceLow, this.state.priceHigh)
    console.log(formattedPrice)
    this.props.retrieveBusinesses(this.state.location, this.state.term, this.state.limit, formattedPrice)
  }

  formatPrice(low, high) {
    let lowInt = parseInt(low)
    let highInt = parseInt(high)
    return (Array.from({length:highInt - lowInt + 1}, (v,k) => k + lowInt)).join()
  }

  onClickHandler(event) {
    event.preventDefault()
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

  render() {
    return (
      <div className='input-form'>
      <form onSubmit={(e) => this.onSubmitHandler(e)}>
        <div className='input-divider'>
          {navigator.geolocation ? <button className='button' onClick={(e) => this.onClickHandler(e)}>Get Current Location</button> : null}
          <input className='input' type='text' name='location' value={this.state.location} placeholder={this.state.placeHolder} onChange={(e) => this.onChangeHandler(e)}></input>
          <input className='input' id='term' type='text' name='term' value={this.state.term} placeholder='What are you looking for?' onChange={(e) => this.onChangeHandler(e)}></input>
        </div>
        <div className='input-divider'>
            <select defaultValue='20' className='input' id='limit' name='limit' onChange={(e) => this.onChangeHandler(e)}>
              <option value='10'>10 rounds</option>
              <option value='20'>20 rounds</option>
              <option value='30'>30 rounds</option>
              <option value='40'>40 rounds</option>
            </select>
            <select defaultValue='1' className='price input' name='priceLow' onChange={(e) => this.onChangeHandlerPriceLow(e)}>
              <option value={1}>From $</option>
              <option value={2}>From $$</option>
              <option value={3}>From $$$</option>
              <option value={4}>From $$$$</option>
            </select>
            <select defaultValue='4' className='price input' name='priceHigh' onChange={(e) => this.onChangeHandler(e)}>
              {this.state.priceLow <= 1 ? <option value={1}>To $</option> : null}
              {this.state.priceLow <= 2 ? <option value={2}>To $$</option> : null}
              {this.state.priceLow <= 3 ? <option value={3}>To $$$</option> : null}
              <option value={4}>To $$$$</option>
            </select>
            {!this.state.term || !this.state.location || this.state.searchingLocation ? null : <input className='button' id='play' value='PLAY!' type='submit'/>}
          </div>
        </form>
      </div>
    )
  }
}
