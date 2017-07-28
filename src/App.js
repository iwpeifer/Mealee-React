import React, { Component } from 'react';
import SearchBar from './components/SearchBar'
import OptionCard from './components/OptionCard'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      businessPool: [],
      defender: {},
      challenger: {}
    }
    this.retrieveBusinesses = this.retrieveBusinesses.bind(this)
  }

  retrieveBusinesses(location, term) {
    return fetch(`http://localhost:3000/retrieve?term=${term}&location=${location}`)
    .then( res => res.json() )
    .then( json => {
      if(json.error) {
        alert("Could not execute search, try altering the location and/or search term.")
        return
      } else {
        this.setState({
          businessPool: json.businesses.map(business => business)
        })
      }
    })
    .then(response => this.initialDrawing())
  }

  initialDrawing() {
    let drawingOne = Math.floor(Math.random() * (this.state.businessPool.length))
    let drawingTwo
    while (!drawingTwo || drawingTwo === drawingOne) {
      drawingTwo = Math.floor(Math.random() * (this.state.businessPool.length))
    }
    this.setState({
      businessPool: this.state.businessPool.filter((business, index) => index !== drawingOne && index !== drawingTwo),
      defender: Object.assign({}, this.state.businessPool[drawingOne]),
      challenger: Object.assign({}, this.state.businessPool[drawingTwo])
    })
  }

  drawDefender

  render() {
    return (
      <div>
        <SearchBar retrieveBusinesses={this.retrieveBusinesses}/>
        <div className='option-card-container'>
          <OptionCard business={this.state.defender}/>
          <OptionCard business={this.state.challenger}/>
        </div>
      </div>
    );
  }
}

export default App;
