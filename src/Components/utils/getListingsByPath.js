//Components
import onlyUnique from './onlyUnique'

export default function getListingsByPath(props,path) {
  let tags = props.state.tags || [];
  let listings = props.state.listings || [];
  let newPath = path.slice(1);
  if (!newPath.includes('/')) { //single Path
    let tag = tags.find(tag => {
      if (tag.name) {
        return tag.name.toLowerCase() === newPath.toLowerCase()
      }
    }) || {};
    let id = tag.id || 1;
    let filteredListings = listings.filter(listing => listing.tag_id === id)
    return filteredListings;
  }

  //get Path Tag IDs
  let tagsArray = newPath.split('/')
  let tagsArrayObjects = tagsArray.map(tagName => {
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