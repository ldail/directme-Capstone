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
    let tagCount = props.state.tagCount || [];
    return tagCount;
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

    //get the IDs of each tag in the path to exclude later on.
    let pathArrayFullTags = pathArray.map(name => tags.find(tag => {
      if (tag.name){
        let find = tag.name.toLowerCase() === name.toLowerCase();
        return find;
      }
    }));
    let pathArrayTagIds = pathArrayFullTags.map(tag => tag.id);

    //check if any of the results are empty, otherwise gather them.
    let empty = false;
    let singlePathData = pathArray.map(name => {
      let results = processSinglePath(props,name,listings,tags);
      if (!results || results.length === 0) { empty = true}
      return results;
    });
    if (empty) { return [];}

    //merge all the results together    
    let mergeData = [];
    singlePathData.forEach(arrayFound => {
      arrayFound.forEach(objectFound => {
        mergeData.push(objectFound);
      });
    });

    let newestData = [];
    console.log(mergeData);
    mergeData.forEach(item => {
      let find = newestData.find(listHere => listHere.id===item.id);
      if (!find) {
        newestData.push(item);
      }
      else {
        find.count += item.count
      }
    });
    
    //exclude all the tags that match the path.

    pathArrayTagIds.forEach(tagId => {
      newestData = newestData.filter(item => item.id !== tagId)
    })
    return newestData;
  }
}

function processSinglePath(props,path,listings,tags) {
  let tag = findTagByName(props,path) || {};
  let id = tag.id || '';
  let filteredListings = listings.filter(listing => listing.tag_id === id);
  let listingTags = filteredListings.map(listing => getAllListingTagsByListingId(props,listing.id));
  if (listingTags.length === 0) { 
    return [];
  }
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
    let count = tagCounts.find(obj => obj.tagId === tagId).count
    return {...find,count}

  });
  return fullTags;
}

async function getPopularityOfAll(props) {
  let answer = await props.getTagCountByPopularity()
  console.log(answer);
  return answer;
};
