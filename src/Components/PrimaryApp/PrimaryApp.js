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

  return(
    <div className="main wrapper">

      {/*Header*/}
      <header>
        <section className="top">
          <HeaderTitle stateChange={props.stateChange} />
          <InfoBox />
          <AccountBox />
        </section>
        <SearchBar />
        <LocationBar router={props.router} stateChange={props.stateChange} getTagNameById={props.getTagNameById} getFullTagByName={props.getFullTagByName} state={props.state} />
      </header>


      {/*Main*/}
      <Route exact path="/?submit" component={SubmitListing} />
      <Route path="/" render={() =>
      <Main stateChange={props.stateChange} state={props.state} router={props.router} getFullTagByName={props.getFullTagByName} getTagById={props.getTagById} getTagByName={props.getTagByName} getTagNameById={props.getTagNameById} />} />
      <SubmitButton />

      {/*Footer*/}
      <SortOptions />
    </div>
  );
}