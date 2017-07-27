import React, { Component } from 'react';
import SearchBar from './components/SearchBar'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      businessPool: []
    }
    this.retrieveBusinesses = this.retrieveBusinesses.bind(this)
  }

  retrieveBusinesses(location, term) {
    return fetch(`http://localhost:3000/retrieve?term=${term}&location=${location}`)
    .then( res => res.json() )
    .then( json => {
      if(json.error) {
        alert("Could not execute search, try altering the location and/or search term.")
      } else {
        this.setState({
          businessPool: json
        })
      }
    })
  }

  tempBusinessDisplay() {
    if ( this.state.businessPool.businesses ) {
      return (
        <div>
          {this.state.businessPool.businesses.map(business => <p>{business.name}</p>)}
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <SearchBar retrieveBusinesses={this.retrieveBusinesses}/>
        {this.tempBusinessDisplay()}
      </div>
    );
  }
}

export default App;
