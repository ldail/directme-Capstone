export default function getListingsByTags(props,path) {
  let tags = props.state.tags || []
  let newPath = path.slice(1);
  let tag = tags.find(tag => {
    if(tag.name) {
      return tag.name.toLowerCase() === newPath;
    }
  }) || {};
  let checkId = tag.id || 2; //programming -> 2


  if (!newPath.includes('/')) { // single Path
    return props.getListingByTagId(checkId);
  }
  let pathArray = newPath.split('/') // multiple paths now in an array.


}