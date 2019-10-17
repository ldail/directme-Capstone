export default function createPath(path1, firstTag, secondTag) {
  let firstTagAfter = firstTag || '';
  let secondTagAfter = secondTag || '';
  let leadingTrail = '/';
  if (firstTag[0] === '?') {
    leadingTrail = '';
  }
  if (!secondTag) {
    if (path1 === '/') {
      return `/${firstTagAfter.toLowerCase()}`
    }
    return `${path1}${leadingTrail}${firstTagAfter.toLowerCase()}`
    }
  else {
    if (path1 === '/') {
      return `${firstTagAfter.toLowerCase()}/${secondTagAfter.toLowerCase()}`
    }
    else {
      return `${path1}/${firstTagAfter.toLowerCase()}/${secondTagAfter.toLowerCase()}`
    }
  }
}