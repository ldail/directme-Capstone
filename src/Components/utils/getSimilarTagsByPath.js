//Components
import getAllListingTagsByListingId from './getAllListingTagsByListingId'
import findTagByName from './findTagByName'
import onlyUnique from './onlyUnique'

//Takes a path name and finds all the listings that include that tag.
//Takes the tags associated with that listing, except the one provided, and returns them as
//Array of:
//  {id: #, name: TEXT, count: #}
export default function getSimilarTagsByPath(props,oldPath) {
  let listings = props.state.listings || [];
  let tags = props.state.tags || [];
  if (oldPath === '/') {
    return tags.filter(tag => tag.name)
  }
  let path = oldPath.slice(1);
  if (!path.includes('/')) { //single-level path
    return processSinglePath(props,path,listings,tags);
  }
  else { // multi-level path or slash at end.
    let checkPath = path.split('/');
    let newPath = [];
    if (checkPath.includes('')) { // includes a trailing slash somewhere, probably at the end.
      newPath = checkPath.filter(item => item !== '');
      if (newPath.length === 1) {
        return processSinglePath(props,path.listings,tags);
      }
    }

    let pathArray = path.split('/');
    let pathArrayIds = pathArray.map(name => tags.find(tag => {
      if (tag.name){
        let find = tag.name.toLowerCase() === name.toLowerCase();
        return find.id;
      }
    }));

    let singlePathData = pathArray.map(name => {
      let results = processSinglePath(props,name,listings,tags);
      return results;
    });
    
    let mergeData = [];
    singlePathData.forEach(arrayFound => {
      arrayFound.forEach(objectFound => {
        mergeData.push(objectFound);
      });
    });
    console.log('mergeData:');
    console.log(mergeData);

    let newestData = [];
    mergeData.forEach(item => {
      let find = newestData.find(listHere => listHere.id===item.id);
      if (!find) {
        newestData.push(find);
      }
      // else {
      //   find.count += item.count
      // }
    });
    console.log('newestData');
    console.log(newestData);
  }
}

function processSinglePath(props,path,listings,tags) {
  let tag = findTagByName(props,path) || {};
  let id = tag.id || '';
  let filteredListings = listings.filter(listing => listing.tag_id === id);
  let listingTags = filteredListings.map(listing => getAllListingTagsByListingId(props,listing.id));
  let totalTags = [];
  listingTags.forEach(listing => {
    listing.tagIds.forEach(id => totalTags.push(id))
  });
  let popularity = []; 
  totalTags.forEach(tagId => {
    let find = popularity.find(obj => obj.tagId === tagId)
    if (find) {
      find.count++;
    }
    else {
      popularity.push({tagId: tagId, count: 1})
    }
  })
  let uniqueTotalTags = totalTags.filter(onlyUnique);
  let filteredUniqueTotalTags = uniqueTotalTags.filter(tagId => tagId !== id);
  let tagCounts = popularity.filter(obj => obj.tagId !== id)
  let fullTags = filteredUniqueTotalTags.map(tagId => {
    let find = tags.find(tag => tag.id === tagId)
    let findCount = tagCounts.find(obj => obj.tagId === tagId).count
    return {...find,findCount}

  });
  return fullTags;
}