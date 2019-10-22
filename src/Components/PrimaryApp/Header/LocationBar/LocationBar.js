//Dependencies
import React from 'react';

//Components
import checkPath from '../../../utils/checkPath'

export default function LocationBar(props) {
  let path = props.router.location.pathname;
  let results = ['home'];
  let checkPathFunction = checkPath(props,path);
  if (!checkPathFunction.missingPath) {
    results = findPath(props);
  }

  return(
    <section className="locationBar">
        {makePath(results)}
        <div className="lineBar"></div>
    </section>
  );
}

function makePath(results) {
  let paths = results.map(tagName => {
    if (results[0] === tagName) {
      return <div class="currentLocation">#{tagName}</div>
    }
    else {
      return <div class="nextLocation">#{tagName}</div>
    }
  })
  return paths;
}

function findPath(props) {
    let foundPath = ['home']
    let path = props.router.location.pathname;
    if (path === '/') {
      return foundPath;
    }
    let path2 = path.slice(1);
    if (!path2.includes('/')) { //single path // e.g. programming
      foundPath.unshift(path2.toLowerCase());
      return foundPath;
    }
    else { //multiple paths. e.g. programming/javascript/react OR a trailing slash.
      let checkPath2 = path.split('/');
      let lowerCase = checkPath2.map(item => item.toLowerCase())
      if (lowerCase.includes('')) { // includes a trailing slash somewhere, probably at the end.
        lowerCase = lowerCase.filter(item => item !== '')
      lowerCase.forEach(tagName => foundPath.unshift(tagName));
      return foundPath;
      }
    }
  }