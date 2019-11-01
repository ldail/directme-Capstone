//Components
import onlyUnique from './onlyUnique'

export default function getListingsByPath(props,path) {
  let state = props.state || {};
  let tags = state.tags || [];
  let listings = state.listings || [];
  if (path === '/') {
    return listings;
  }
  let newPath = path.slice(1);
  if (!newPath.includes('/')) { //single Path
    return processSinglePath(tags,newPath,listings)
  }

  //get Path Tag IDs
  let tagsArray = newPath.split('/')
  let newestPath = [];
  if (tagsArray.includes('')) { // includes a trailing slash somewhere, probably at the end.
    newestPath = tagsArray.filter(item => item !== '');
    if (newestPath.length === 1) {
      return processSinglePath(tags,newestPath[0],listings);
    }
  }
  else { 
    newestPath = tagsArray
  }

  let tagsArrayObjects = newestPath.map(tagName => {
    return tags.find(tag => {
      if (tag.name) {
        return tag.name.toLowerCase() === tagName.toLowerCase();
      }
    }) || {};
  }) || [];
  let tagsArrayIds = tagsArrayObjects.map(tagCheck => tagCheck.id)
  
  //get listings that include all tags IDs

  let finalListings = listings;
  let linkIds = listings.map(listing => listing.id);
  let remainingLinks = linkIds.filter(onlyUnique)

  tagsArrayIds.forEach(tagId => {
    let stepLinks = [];
    remainingLinks.forEach(linkId => {
      let check = listings.find(listing => listing.id === linkId && listing.tag_id === tagId);
      if (check) { stepLinks.push(check.listing_id)}
    })
    remainingLinks = stepLinks;
  })


  let final = remainingLinks.map(linkId => listings.find(listing => listing.id === linkId))
  return final;
}

function processSinglePath(tags,newPath,listings) {
  let tag = tags.find(tag => {
    if (tag.name) {
      return tag.name.toLowerCase() === newPath.toLowerCase()
    }
  }) || {};
  let id = tag.id || 1;
  let filteredListings = listings.filter(listing => listing.tag_id === id)
  return filteredListings;
}