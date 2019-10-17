export default function getHubList(props,currentHub2) {
  let path = props.router.location.pathname;
  let missingPath = false;
  let currentHub = 1;

  //If it's the home page, then keep currentPage as 0 (tag_id of the parent page). Otherwise, continue.
  /*
  if (path !== '/') { 

    //We're on a single path, such as 'programming', or 'games'
    if (!path.includes('/')) {
      let potentials = props.state.hub_links.filter(item => item.hub_id === 1);
      let pathTag = props.getFullTagByName(path) || {}
      let pathTagId = pathTag.id;
      if (!pathTagId) { 
        missingPath = true;
        return currentHub = 1;
      }
      else {
        let check = potentials.find(item => item.sub_hub === pathTagId);
        if (!check) {
          missingPath = true;
          return currentHub = 1;
        }
        else {

        }
      }
      let subcategory_list = props.state.subcategory_list || [];
      let check = subcategory_list.find(sub => tag.subcategory_to === 0)
      if (check) { return currentPage = tag.id }
      else { 
        missingPath = true;
        return currentPage = 0;
      }
    }

    let fullPathArray = path.split('/');

    //Check if each path is an actual tag. If not, set the error.
    fullPathArray.forEach(path => {
      if (!props.getFullTagByName(path)) {
        missingTag = true;
      }
    });

    //Check if each tag matches the path down to the home/parent page.
    //['programming','javascript','react']
    let subcategory_list = props.state.subcategory_list || [];
    for (let i = fullPathArray.length; i > 1; i--) {
      let farthest = props.getFullTagByName(fullPathArray[i-1]) || {}
      let farthestId = farthest.tag_id
      let closer = props.getFullTagByName(fullPathArray[i-2]) || {};
      let closerId = closer.tag_id;
      if (!subcategory_list.find(item => item.tag_id === farthestId && item.subcategory_to === closerId)) {
        missingPath = true;
        return currentPage = 0;
      }
    }

  }
  */

  currentHub = 1;
  let linksState = props.state.hubLinks || [];
  let tagsState = props.state.hubTags || [];
  let tags = props.state.tags || [];
  let hubs = linksState.filter(item => item.hub_id === currentHub); // [{1,2},{1,5},{1,8}]
  let nameArray = hubs.map(item => item.sub_hub); // [2,5,8]
  let names = nameArray.map(mapItem => { // ends up with tag IDs to display ['Programming', 'Games', 'Online']
    let hub_tag_item = tagsState.find(item => item.hub_id === mapItem) || {};
    return hub_tag_item.tag_id;
  });
  let newNames = names.map(mapItem => tags.find(tag => tag.id === mapItem));
  return {currentHub,newNames,missingPath}
}







/*
//Gets a list of the subcategories from the current path.
function getCurrentPage(props) {
  let currentPage = 0;
  let path = props.router.location.pathname;
  if (path === '/') {
    if (props.stateChange && props.stateChange.missingTag === true) { props.stateChange({missingTag: false})}
    return currentPage = 0;
  }
  else {
    let tag = path.slice(1); //could be 'programming' or 'programming/javascript/react'
    if (tag.includes('/')) { //must be multiple path 'programming/javascript' or more
      // return currentPage = 0; // - for now, just return to home page (hacky)
      //support multiple paths - in the future

      //Make sure the path is actually an established path for subcategories.
      let splitPath = tag.split('/'); //['Programming','Javascript','React']
      let nextCheck = 0;
      for (let i =0; i<splitPath.length; i++) {
        let subcategory_list = props.state.subcategory_list || []
        let tag = props.getFullTagByName(splitPath[i]) || {}
        let subs = subcategory_list.filter(item => tag.id === item.subcategory_to);
        if (!subs) {
          //could not find the established path
          return currentPage = nextCheck
        }
        nextCheck = tag.id;
      }
      currentPage = nextCheck;
    }
    let foundTag = props.getFullTagByName(tag)
    if (!foundTag) {
      console.log(props);
      if (props.stateChange && props.state.tagMissing !== true) { props.stateChange({tagMissing: true}) }
      console.log('missing tag');
    }
    else {
      currentPage = foundTag.id
    }

  }
  return currentPage
}

export default function getHubList(props) {
  let currentPage = getCurrentPage(props);
  let subcategory_list = props.state.subcategory_list || [];
  let thisPageSubcategories = subcategory_list.filter(item => item.subcategory_to === currentPage);

  return thisPageSubcategories;
};*/