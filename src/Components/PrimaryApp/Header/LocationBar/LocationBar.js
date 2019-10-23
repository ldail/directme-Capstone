//Dependencies
import React from 'react';
import {Link} from 'react-router-dom'

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

  console.log(results);
  let paths = results.map((tagName,index) => {
    let link = ''
    if (index === 0 && tagName === 'home') {
      link = '/';
    }
    else {   //results = ['programming','home']
      let goTo = results.length - index;
      for (let i = goTo;i>0;i--) {
        let currentTag = results[goTo-1];
        console.log(currentTag);
        if (currentTag === 'home') {
          link += '';
        }
        else {
          link += `/${results[i-1]}`;
        }
      }
    }
    // if (index === results.length-1 && tagName === 'home') {
    //   link = '/'
    // }
    // else {
    //   let reversedPath = [];
    //   for (let i =results.length-1; i>=0;i--) {
    //     reversedPath.push(results[i]);
    //   }
    //   console.log(reversedPath);
    //   reversedPath.forEach((pathName,index2) => {
    //     let goTo = reversedPath.length - 1 - index;
    //     console.log(goTo);
    //     if (index <= goTo) {
    //       if (pathName === 'home') {
    //         link += '/';
    //       }
    //       else {
    //         link += `/${pathName}`
    //       }
    //     }
    if (index === 0) {
      return <div class="currentLocation"><Link to={link}>#{tagName}</Link></div>
    }
    else {
      return <div class="nextLocation"><Link to={link}>#{tagName}</Link></div>
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