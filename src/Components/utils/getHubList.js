export default function getHubList(props,currentHub) {
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
  console.log(newNames);
  return newNames;
}

