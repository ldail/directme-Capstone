//Dependencies
import React from 'react';
import {Link, useLocation, useHistory } from 'react-router-dom';

export default function CatListing(props) {
  let currentTagId = props.info.tag_id;
  let currentTagName = props.getTagNameById(currentTagId) || ''
  let lowerCase = currentTagName.toLowerCase();
  let path = () => {
    if (props.router.location.pathname === '/') {
      return lowerCase;
    }
    else {
      return `${props.router.location.pathname}/${lowerCase}`
    }
  }
  function onClickEvent() {
    props.stateChange({currentHub: currentTagId});
  }
  return(
    <li className="catListing">
      <div className="catListingNumbers">
        <div className="catListingNumbersItem">20</div>
        <div className="catListingNumbersItem">12</div>
      </div>
      <div className="catListingInfo">
        <h3><Link to={path} onClick={onClickEvent}>{currentTagName}</Link></h3>
        <h4> --> Modern Art  ||  Art Exhibits || ...</h4>
      </div>
    </li>
  );
}