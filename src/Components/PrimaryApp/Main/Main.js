//Dependencies
import React from 'react';
import {Route, useLocation, useHistory, Switch} from 'react-router-dom';

//Components
import MainNav from './MainNav/MainNav';
import MainHubs from './MainHubs/MainHubs'
import MainTags from './MainTags/MainTags';
import SubmitListing from '../SubmitListing/SubmitListing'

export default function Main(props) {
  let check = useLocation().search;

  function checkPage() {
    if (check.includes('?tags')) {
      return <MainTags state={props.state} router={props.router} getTagById={props.getTagById} getTagByName={props.getTagByName} stateChange={props.stateChange} />
    }

    else if (check.includes('?listings')) {
      return <div>This is where the listings will go!</div>
    }
    else if (check.includes('?submit')) {
      return <SubmitListing />
    }

    else {
      return <MainHubs state={props.state} router={props.router} getFullTagByName={props.getFullTagByName} getFullTagById={props.getFullTagById} getTagById={props.getTagById} getTagByName={props.getTagByName} stateChange={props.stateChange} getTagNameById={props.getTagNameById} />
    }
  }
  let pageDisplay = checkPage();

  return(
    <main>
      <MainNav state={props.state} router={props.router} />
      {pageDisplay}
    </main>
  );
}