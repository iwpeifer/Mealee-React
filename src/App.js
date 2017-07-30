import React, { Component } from 'react';
import SearchBar from './components/SearchBar'
import OptionCard from './components/OptionCard'
import Title from './components/Title'

class App extends Component {
  constructor() {
    super()
    this.state = {
      businessPool: [],
      defender: '',
      challenger: '',
      gameHasStarted: false
    }
    this.retrieveBusinesses = this.retrieveBusinesses.bind(this)
    this.removeOption = this.removeOption.bind(this)
  }

  retrieveBusinesses(location, term, limit) {
    return fetch(`https://mealee-api.herokuapp.com/retrieve/?term=${term}&location=${location}&limit=${limit}`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      this.setState({
        businessPool: json.businesses.map(business => business)
      })
    })
    .then(response => {
      if (this.state.businessPool.length >= 2) {
        this.initialDrawing()
      } else {
        alert ("No businesses found; try altering the location and/or search term.")
        this.setState({
          defender: '',
          challenger: ''
        })
      }
    })
    .catch( response => {
      console.log(response)
      alert("No businesses found; try altering the location and/or search term.")
    })
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
      challenger: Object.assign({}, this.state.businessPool[drawingTwo]),
      gameHasStarted: true
    })
  }

  removeOption(which) {
    if (this.state.businessPool.length >= 1) {
      let drawing = Math.floor(Math.random() * (this.state.businessPool.length))
      this.setState({
        businessPool: this.state.businessPool.filter((business, index) => index !== drawing),
        [which]: Object.assign({}, this.state.businessPool[drawing])
      })
    } else {
      this.setState({
        [which]: ''
      })
    }
  }

  render() {
    let isWinner = false
    if (this.state.gameHasStarted) {
      if (this.state.defender === '' || this.state.challenger === '') {
        isWinner = true
      }
    }
    return (
      <div className='app-container'>
        <Title/>
        <SearchBar retrieveBusinesses={this.retrieveBusinesses}/>
        <div className='option-card-container'>
          {this.state.defender ? <OptionCard which='challenger' isWinner={isWinner} business={this.state.defender} opponent={this.state.challenger} removeOption={this.removeOption}/> : null}
          {this.state.challenger ? <OptionCard which='defender' isWinner={isWinner} business={this.state.challenger} opponent={this.state.defender} removeOption={this.removeOption}/> : null}
        </div>
      </div>
    );
  }
}

export default App;
