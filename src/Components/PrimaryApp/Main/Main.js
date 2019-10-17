//Dependencies
import React from 'react';
import {useLocation} from 'react-router-dom';

//Components
import MainNav from './MainNav/MainNav';
import MainNavNumbers from './MainNavNumbers/MainNavNumbers'
import MainHubs from './MainHubs/MainHubs'
import MainTags from './MainTags/MainTags';
import SubmitListing from '../SubmitListing/SubmitListing'
import MainListings from './MainListings/MainListings'

export default function Main(props) {
  let check = useLocation().search;

  function checkPage() {
    if (check.includes('?tags') || props.state.displayTab === '?tags') {
      if (props.state.displayTab !== '?tags') { props.stateChange({displayTab: '?tags'})}
      return <MainTags router={props.router} {...props}  />
    }

    else if (check.includes('?listings') || props.state.displayTab === '?listings') {
      if (props.state.displayTab !== '?listings') { props.stateChange({displayTab: '?listings'})}
      return <MainListings router={props.router} {...props} />
    }
    else if (check.includes('?submit') || props.state.displayTab === '?submit') {
      if (props.state.displayTab !== '?submit') { props.stateChange({displayTab: '?submit'})}
      return <SubmitListing />
    }

    else if (check.includes('?hubs') || props.state.displayTab === '?hubs') {
      if (props.state.displayTab !== '?hubs') {
        props.stateChange({displayTab: '?hubs'});
      }
      return <MainHubs router={props.router} {...props} />
    }
  }
  let pageDisplay = checkPage();

  return(
    <main>
      <MainNav router={props.router} {...props}/>
      <MainNavNumbers router={props.router} {...props}/>
      {pageDisplay}
    </main>
  );
}