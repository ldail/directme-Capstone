//Dependencies
import React from 'react';

//Components
import HeaderTitle from './Header/HeaderTitle/HeaderTitle';
import SearchBar from './Header/SearchBar/SearchBar';
import LocationBar from './Header/LocationBar/LocationBar';

import Main from './Main/Main';

import SubmitButton from './Main/SubmitButton/SubmitButton';

//CSS
import './PrimaryApp.css'

export default function PrimaryApp(props) {

  let state = props.state || {};
  let error = state.error || {};


  return(
    <div className="main wrapper">

      {/*Header*/}
      <header>
        <section className="top">
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