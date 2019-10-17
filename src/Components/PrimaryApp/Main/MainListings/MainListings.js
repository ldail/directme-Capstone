//Dependencies
import React from 'react'

//Components
import LinkListing from '../LinkListing/LinkListing';
import checkPath from '../../../utils/checkPath';
import getListingsByTags from '../../../utils/getListingsByTags'

//CSS
import './MainListings.css';

export default function MainListings(props) {

  let path = props.router.location.pathname;
  let check = checkPath(props,path);
  let listings = getListingsByTags(props, path) || [];

  function makeListingDisplay() {
    if (check.missingPath === true) {
      return <li>This is not an established path yet!</li>
    }
     if (listings.length === 0) {
       return <li>There are no listings for these tags yet!</li>
     }
     console.log('made it through');
     return listings.map((item,index) => <LinkListing key={index} currentHub={check.currentHub} info={item} router={props.router} {...props}  />)
   }

  return (
    <section className="catListings">
      <ul>
        {makeListingDisplay()}
      </ul>
    </section>
  )
}