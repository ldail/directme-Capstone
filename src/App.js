//Dependencies
import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import config from './config'

//Components
import LandingPage from './Components/LandingPage/LandingPage';
import PrimaryApp from './Components/PrimaryApp/PrimaryApp';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayPage: LandingPage,
      displayTab: '?hubs'
    }
  }

  stateChange = (newState) => { 
    this.setState({
      ...newState
    });
  }

  componentDidMount() {
    this.checkPage();

    //Connect to API
    fetch(`${config.API_ENDPOINT}/allSubcategoryLists`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('error in fetch!')
      }
      return res.json();
    })
    .then(resJson => console.log(resJson))
    .catch(e=> console.error('there was an error'));
  }

  //Check if local storage has been set indicating that the landing page has been seen.
  checkPage() {
    if (!window.localStorage.getItem('seenLanding')) { 
      this.setState({seenLanding: 'true'})
      window.localStorage.setItem('seenLanding',true);
    }
    else {
      this.setState({seenLanding: true, displayPage: PrimaryApp})
    }
  }

  render() {
    return (
        <Route exact path="/" render={(e) => 
          <this.state.displayPage props={e} stateChange={this.stateChange} state={this.state}  />} />
    )
  }
}
