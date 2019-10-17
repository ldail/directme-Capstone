//Dependencies
import React from 'react';

//Components
import CatListing from '../CatListing/CatListing';
import getHubList from '../../../utils/getHubList';
import checkPath from '../../../utils/checkPath';

export default function MainHubs(props) {

  let path = props.router.location.pathname;
  let check = checkPath(props,path)
  console.log(check);
  let hubList = getHubList(props, check.currentHub);

  function makeHubDisplay() {
    if (check.missingPath === true) {
      return <li>This is not an established path yet!</li>
    }
    if (hubList.newNames.length === 0) {
      // if (props.state.displayTab !== '?listings' && props.router.location.pathname !== '/') {
      //   props.stateChange({displayTab: '?listings'});
      // }
      return <li>There are no further hubs!</li>
    }
    return hubList.newNames.map((item,index) => <CatListing key={index} info={item} router={props.router} {...props} />)
  }

  // function checkPath() {
  //   if (hubList.missingPath === true) {
  //     return <li>There is no established path here yet!</li>
  //   }
  //   return makeHubDisplay();
  // }

  return(
      <section className="catListings">
        <ul>
        {makeHubDisplay()}
        </ul>

      </section>


  );
}