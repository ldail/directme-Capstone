//Dependencies
import React from 'react';

//Components
import CatListing from '../CatListing/CatListing';
import getHubList from '../../../utils/getHubList';
import checkPath from '../../../utils/checkPath';

export default function MainHubs(props) {

  let router = props.router || {};
  let location = router.location || {};
  let path = location.pathname || '';
  let check = checkPath(props,path) // returns the currentHub (unique) id and if the path is missing.
  let hubList = getHubList(props, check.currentHub); //returns the list of categories within. Empty if none.

  function makeHubDisplay() {
    if (check.missingPath === true) {
      return <li>This is not an established path yet!</li>
    }
    if (hubList.length === 0) {
      return <li className="noFurtherHubs">There are no further hubs!</li>
    }
    return hubList.map((item,index) => <CatListing key={index} currentHub={check.currentHub} info={item} router={props.router} {...props}  />)
  }

  return(
      <section id="hubsCatListings" className="catListings">
        <ul id="hubCatListingsUl">
        {makeHubDisplay()}
        </ul>

      </section>


  );
}