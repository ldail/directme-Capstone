export default function findTagIdByName(props,tagName) {
  let tags = props.state.tags || [];
  return tags.find(tag => tag.name === tagName);
}