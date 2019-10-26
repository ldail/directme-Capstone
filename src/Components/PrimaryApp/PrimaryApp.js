//Dependencies
import React from 'react';

//Components
import LandingPage2 from '../LandingPage/LandingPage2';

import HeaderTitle from './Header/HeaderTitle/HeaderTitle';
import SearchBar from './Header/SearchBar/SearchBar';
import LocationBar from './Header/LocationBar/LocationBar';

import Main from './Main/Main';

import SubmitButton from './Main/SubmitButton/SubmitButton';

//CSS
import './PrimaryApp.css'

export default class PrimaryApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seenLanding: false
    }
  }

  seenLandingChange = () => {
    this.setState({seenLanding: true});
  }

  render() {
    let props = this.props || {}
    let state = props.state || {};
    let error = state.error || {};


  return(
    <div className="main wrapper">
      {!window.localStorage.getItem('seenLanding') && this.state.seenLanding === false ? <LandingPage2 seenLandingChange={this.seenLandingChange} /> : ''}

      {/*Header*/}
      <header>
        <section id="top" className="top">
          <HeaderTitle {...props} />
          {/* <InfoBox />
          <AccountBox /> */}
        </section>
        <SearchBar router={props.router} {...props} />
        <LocationBar router={props.router} {...props} />
      </header>


      {/*Main*/}
      <Main {...props} router={props.router} />
      <SubmitButton router={props.router} />

      {/*Footer*/}
      {/* <SortOptions /> */}
    </div>
  );
        }
}