export default function findTagById(props,tagId) {
  let tags = props.state.tags || [];
  return tags.find(tag => tag.id === tagId);
}