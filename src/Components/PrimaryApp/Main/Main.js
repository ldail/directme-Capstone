//Dependencies
import React from 'react';
import {Route, useLocation, useHistory, Switch} from 'react-router-dom';

//Components
import MainNav from './MainNav/MainNav';
import MainHubs from './MainHubs/MainHubs'
import MainTags from './MainTags/MainTags';

export default function Main(props) {
  let check = useLocation().search;

  function checkPage() {
    if (check.includes('?tags')) {
      return <MainTags />
    }

    else if (check.includes('?hubs')) {
      return <MainHubs />
    }
  }
  let pageDisplay = checkPage();

  return(
    <main>
      <MainNav />
      {pageDisplay}
    </main>
  );
}