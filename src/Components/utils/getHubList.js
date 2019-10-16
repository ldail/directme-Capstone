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
};