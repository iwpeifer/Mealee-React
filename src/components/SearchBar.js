import React, { Component } from 'react'

export default class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      term: '',
      location: ''
    }
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

  render() {
    return (
      <form onSubmit={(e) => this.onSubmitHandler(e)}>
        <input type='text' name='location' value={this.state.location} placeholder='location' onChange={(e) => this.onChangeHandler(e)}></input>
        <input type='text' name='term' value={this.state.term} placeholder='What are you looking for?' onChange={(e) => this.onChangeHandler(e)}></input>
        <input type='submit'/>
      </form>
    )
  }
}
