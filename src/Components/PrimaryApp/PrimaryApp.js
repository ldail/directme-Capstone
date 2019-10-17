//Dependencies
import React from 'react';
import {Route} from 'react-router-dom';

//Components
import HeaderTitle from './Header/HeaderTitle/HeaderTitle';
import InfoBox from './Header/InfoBox/InfoBox';
import AccountBox from './Header/AccountBox/AccountBox';
import SearchBar from './Header/SearchBar/SearchBar';
import LocationBar from './Header/LocationBar/LocationBar';

import Main from './Main/Main';
import SubmitListing from './SubmitListing/SubmitListing'

import SubmitButton from './Main/SubmitButton/SubmitButton';
import SortOptions from './SortOptions/SortOptions';

//CSS
import './PrimaryApp.css'

export default function PrimaryApp(props) {
  console.log(props);
  return(
    <div className="main wrapper">

      {/*Header*/}
      <header>
        <section className="top">
          <HeaderTitle {...props} />
          <InfoBox />
          <AccountBox />
        </section>
        <SearchBar />
        <LocationBar router={props.router} {...props} />
      </header>


      {/*Main*/}
      {console.log({props})}
      <Route exact path="/?submit" component={SubmitListing} />
      <Route path="/" render={() =>
      <Main {...props} router={props.router}  />} />
      <SubmitButton />

      {/*Footer*/}
      <SortOptions />
    </div>
  );
}