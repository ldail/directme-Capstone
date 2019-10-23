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

    //This is a search result. 
    
    //Get the parameters of the search.
    let searchFilter = props.router.location.search; //?tag=xxx&yyy
    let removeTagParam = searchFilter.slice(5);
    let tagsArray = removeTagParam.split('&'); // tags split ['javascript,'react']
    let listings = props.state.listings;
    tagsArray = tagsArray.map(tag => tag.toLowerCase())
    let results = [];
    console.log('tagsArray');
    console.log(tagsArray);
    console.log('listings');
    console.log(filteredListings);
    tagsArray.forEach(tag => { // 3: Programming,Javascript,React
      let fullTag = findTagByName(props,tag.toLowerCase()) || {}
      console.log(fullTag);
      let find = listings.filter(listing => listing.tag_id === fullTag.id);
      console.log(find);
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
    if (allAreThere.length === 0) {
      return <div>There are no listings for this!</div>
    }
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