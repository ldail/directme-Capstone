export default function createPath(path1, firstTag, secondTag) {
  console.log(path1);
  let firstTagAfter = firstTag || '';
  let secondTagAfter = secondTag || '';
  let leadingTrail = '/';
  let path = path1;
  if (firstTag[0] === '?') {
    leadingTrail = '';
  }
  if (path1[path1.length-1] === '/') {
    path = path1.slice(0,path1.length-1);
  }
  if (!secondTag) {
    if (path === '/') {
      return `/${firstTagAfter.toLowerCase()}`
    }
    return `${path}${leadingTrail}${firstTagAfter.toLowerCase()}`
    }
  else {
    if (path === '/') {
      return `${firstTagAfter.toLowerCase()}/${secondTagAfter.toLowerCase()}`
    }
    else {
      return `${path}/${firstTagAfter.toLowerCase()}/${secondTagAfter.toLowerCase()}`
    }
  }
}