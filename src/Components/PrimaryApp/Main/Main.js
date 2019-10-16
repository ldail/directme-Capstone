//Dependencies
import React from 'react';
import {Route, useLocation, useHistory, Switch} from 'react-router-dom';

//Components
import MainNav from './MainNav/MainNav';
import MainNavNumbers from './MainNavNumbers/MainNavNumbers'
import MainHubs from './MainHubs/MainHubs'
import MainTags from './MainTags/MainTags';
import SubmitListing from '../SubmitListing/SubmitListing'

export default function Main(props) {
  let check = useLocation().search;

  function checkPage() {
    if (check.includes('?tags') || props.state.displayTab === '?tags') {
      if (props.state.displayTab !== '?tags') { props.stateChange({displayTab: '?tags'})}
      return <MainTags state={props.state} router={props.router} getTagById={props.getTagById} getTagByName={props.getTagByName} stateChange={props.stateChange} />
    }

    else if (check.includes('?listings') || props.state.displayTab === '?listings') {
      if (props.state.displayTab !== '?listings') { props.stateChange({displayTab: '?listings'})}
      return <div>This is where the listings will go!</div>
    }
    else if (check.includes('?submit') || props.state.displayTab === '?submit') {
      if (props.state.displayTab !== '?submit') { props.stateChange({displayTab: '?submit'})}
      return <SubmitListing />
    }

    else if (check.includes('?hubs') || props.state.displayTab === '?hubs') {
      if (props.state.displayTab !== '?hubs') {
        props.stateChange({displayTab: '?hubs'});
      }
      return <MainHubs state={props.state} router={props.router} getFullTagByName={props.getFullTagByName} getFullTagById={props.getFullTagById} getTagById={props.getTagById} getTagByName={props.getTagByName} stateChange={props.stateChange} getTagNameById={props.getTagNameById} />
    }
  }
  let pageDisplay = checkPage();

  return(
    <main>
      <MainNav state={props.state} router={props.router} stateChange={props.stateChange}/>
      <MainNavNumbers state={props.state} router={props.router} getFullTagByName={props.getFullTagByName} />
      {pageDisplay}
    </main>
  );
}