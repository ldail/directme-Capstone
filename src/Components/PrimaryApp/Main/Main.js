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
    if (check.includes('?tags')) {
      return <MainTags router={props.router} {...props}  />
    }

    else if (check.includes('?listings')) {
      return <MainListings router={props.router} {...props} />
    }
    else if (check.includes('?submit')) {
      return <SubmitListing />
    }

    else {
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