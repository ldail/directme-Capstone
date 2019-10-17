//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';

//Components
import getHubList from '../../../utils/getHubList'
import checkPath from '../../../utils/checkPath'

export default function CatListing(props) {
  let path = props.router.location.pathname;
  let info = props.info || {}
  let currentTagName = info.name || ''
  
  function createPath(tagName) {
    if (path === '/') {
      return `/${tagName.toLowerCase()}`;
    }
    else {
      return `${path}/${tagName.toLowerCase()}`
    }
  }

  function createSubPath(tagName) {
    if (path === '/') {
      return `${currentTagName.toLowerCase()}/${tagName.toLowerCase()}`
    }
    else {
      return `${path}/${currentTagName}/${tagName.toLowerCase()}`
    }
  }
  let check = checkPath(props,createPath(currentTagName));
  let subcategories = getHubList(props,check.currentHub) || [];

  function listSubcategories() {
    if (subcategories.length === 0) {
      return <li>There are no further hubs!</li>
    }
    else {
      if (subcategories[0]) {
        return subcategories.map((item,index) => <Link to={() => createSubPath(item.name)}><li key={index}>{item.name}</li></Link>)
    }
  }
}





  return(
    <li className="catListing">
      <div className="catListingNumbers">
        <div className="catListingNumbersItem">20</div>
        <div className="catListingNumbersItem">12</div>
      </div>
      <div className="catListingInfo">
        <h3><Link to={() => createPath(currentTagName)}>{currentTagName}</Link></h3>
        <h4><ul>{listSubcategories()}</ul></h4>
      </div>
    </li>
  );
}