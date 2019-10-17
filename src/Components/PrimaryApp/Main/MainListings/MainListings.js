//Dependencies
import React from 'react'

//Components
import config from '../../../../config'
import LinkListing from '../LinkListing/LinkListing';
import checkPath from '../../../utils/checkPath';
import getListingsByTags from '../../../utils/getListings'

//CSS
import './MainListings.css';

export default function MainListings(props) {

  function getListingByTagId(tag_id) {
    fetch (`${config.API_ENDPOINT}/listings/tag/${tag_id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('error in fetch!')
      }
      return res.json();
    })
    .then(resJson => {
      return resJson;
    })
    .catch(e => console.log(e))
  }


  let path = props.router.location.pathname;
  let check = checkPath(props,path);
  let data = getListingByTagId(3);
  console.log(data);

  function makeListingDisplay() {
    if (check.missingPath === true) {
      return <li>This is not an established path yet!</li>
    }
  //    if (listings.length === 0) {
  //      return <li>There are no listings for these tags yet!</li>
  //    }
  //    return listings.map((item,index) => <LinkListing key={index} currentHub={check.currentHub} info={item} router={props.router} {...props}  />)
  //  }
  }
  return (
    <section className="catListings">
      <ul>
        {makeListingDisplay()}
      </ul>
    </section>
  )
}