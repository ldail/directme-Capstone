//Dependencies
import React from 'react';

//Components
import CatListing from '../CatListing/CatListing';
import getHubList from '../../../utils/getHubList';

export default function MainHubs(props) {

  function makeHubDisplay() {
    if (!hubList[0]) {
      // if (props.state.displayTab !== '?listings' && props.router.location.pathname !== '/') {
      //   props.stateChange({displayTab: '?listings'});
      // }
      return <li>There are no further hubs!</li>
    }
    return hubList.map((item,index) => <CatListing key={index} info={item} getTagById={props.getTagById} getTagByName={props.getTagByName} stateChange={props.stateChange} router={props.router} state={props.state} getTagNameById={props.getTagNameById} />)
  }

  let hubList = getHubList(props);

  return(
      <section className="catListings">
        <ul>
        {makeHubDisplay()}
        </ul>

      </section>


  );
}