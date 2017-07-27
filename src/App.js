import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      businessPool: []
    }
  }

  componentWillMount() {
    return fetch(`http://localhost:3000/retrieve?term=${'chinese'}&location=${'new jersey'}`)
    .then( res => res.json() )
    .then( json => {
      if(json.error) {
        alert("Could not execute search, try altering the location and/or search term.")
      } else {
        console.log(json)
        // this.setState({
        //   yelp: json,
        //   locationInput: '',
        //   termInput: ''
        // })
      }
    })
  }

  render() {
    return (
      <div>
      TEST
      </div>
    );
  }
}

export default App;
