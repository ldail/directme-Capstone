import React, { Component } from 'react'
import {Link, Route, Switch} from 'react-router-dom'

//Components
import LandingPage from './Components/LandingPage/LandingPage'
import PrimaryApp from './Components/PrimaryApp/PrimaryApp'

export default class App extends Component {
  render() {
    return (
      <Switch>

        {/*Landing Page*/}
        <Route exact path="/" component={LandingPage} />

        {/*Primary App*/}
        <Route exact path="/main" component={PrimaryApp} />
      </Switch>
    )
  }
}
