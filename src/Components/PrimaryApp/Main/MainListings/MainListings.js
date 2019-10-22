//Dependencies
import React from 'react'

//Components
import LinkListing from '../LinkListing/LinkListing';
import checkPath from '../../../utils/checkPath';
import getListingsByPath from '../../../utils/getListingsByPath'
import getAllListingTagsByListingId from '../../../utils/getAllListingTagsByListingId'

//CSS
import './MainListings.css';
import findTagByName from '../../../utils/findTagByName';

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
    if (!props.router.location.search.includes('?tag=')) {
      return filteredListings.map((item,index) => <LinkListing key={index} currentHub={check.currentHub} info={item} router={props.router} {...props}  />)
    }
    let searchFilter = props.router.location.search; //?tag=xxx&yyy
    let removeTagParam = searchFilter.slice(5);
    let tagsArray = removeTagParam.split('&');
    let results = [];
    tagsArray.forEach(tag => { // 3: Programming,Javascript,React
      let fullTag = findTagByName(props,tag.toLowerCase());
      let find = filteredListings.filter(listing => listing.tag_id === fullTag.id);  //16 listings, 4 match all, 4 match only one/two
      results = [
        ...results,
        ...find
      ];
    })  
    console.log('results');
    console.log(results);
    let allAreThere = [];
    results.forEach(result => {
      let looking = results.filter(looking => result.id === looking.id) // all the ones matching the current search.
      console.log('looking');
      console.log(looking);
      let find = allAreThere.find(final => final.id === looking[0].id)
      console.log('find');
      console.log(find);
      if (looking.length === tagsArray.length && !find) {
        allAreThere.push(result);
      }
    })
    console.log('allAreThere');
    console.log(allAreThere);
    return allAreThere.map((item,index) => <LinkListing key={index} currentHub={check.currentHub} info={item} router={props.router} {...props}  />)
  
  }
    return (
      <section className="catListings">
        <ul>
          {makeListingDisplay()}
        </ul>
      </section>
    )
}