export default function findTagByName(props,tagName) {
  let tags = props.state.tags || [];
  return tags.find(tag => {
    if (tag.name) {
      return tag.name.toLowerCase() === tagName.toLowerCase()
    }});
}