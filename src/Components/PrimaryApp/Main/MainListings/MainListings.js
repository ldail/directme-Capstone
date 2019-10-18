//Dependencies
import React from 'react'

//Components
import LinkListing from '../LinkListing/LinkListing';
import checkPath from '../../../utils/checkPath';
import getListingsByPath from '../../../utils/getListingsByPath'

//CSS
import './MainListings.css';

export default function MainListings(props) {

  function makeListingDisplay() {
    let path = props.router.location.pathname;
    let check = checkPath(props,path);
    let filteredListings = getListingsByPath(props,path);
    if (check.missingPath === true) {
      return <li>This is not an established path yet!</li>
    }
    if (filteredListings.length === 0) {
      return <li>There are no listings for these tags yet!</li>
    }
    return filteredListings.map((item,index) => <LinkListing key={index} currentHub={check.currentHub} info={item} router={props.router} {...props}  />)
  }
    return (
      <section className="catListings">
        <ul>
          {makeListingDisplay()}
        </ul>
      </section>
    )
}