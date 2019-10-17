//Dependencies
import React from 'react';

//Components
import CatListing from '../CatListing/CatListing';
import getHubList from '../../../utils/getHubList';
import checkPath from '../../../utils/checkPath';

export default function MainHubs(props) {

  let path = props.router.location.pathname;
  let check = checkPath(props,path) // returns the currentHub (unique) id and if the path is missing.
  let hubList = getHubList(props, check.currentHub); //returns the list of categories within. Empty if none.
  let data = props.getListingByTagId(3);
  console.log(data);

  function makeHubDisplay() {
    if (check.missingPath === true) {
      return <li>This is not an established path yet!</li>
    }
    if (hubList.length === 0) {
      return <li>There are no further hubs!</li>
    }
    return hubList.map((item,index) => <CatListing key={index} currentHub={check.currentHub} info={item} router={props.router} {...props}  />)
  }

  return(
      <section className="catListings">
        <ul>
        {makeHubDisplay()}
        </ul>

      </section>


  );
}