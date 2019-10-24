//Dependencies
import React from 'react';
import {Link} from 'react-router-dom'

//Components
import checkPath from '../../../utils/checkPath'

export default function LocationBar(props) {
  let path = props.router.location.pathname;
  console.log(path);
  let results = ['home'];
  let checkPathFunction = checkPath(props,path);
  if (!checkPathFunction.missingPath) {
    results = findPath(props);
  }

  return(
    <section className="locationBar">
        {makePath(props,results)}
        <div className="lineBar"></div>
    </section>
  );
}

function makePath(props,results) {

  console.log(results);
    let path = props.router.location.pathname;
    let paths = results.map((tagName,index) => {
      if (index !== results.length-1) {
        if (index === 0) {
          return <div class="currentLocation"><Link to={`${path}`}>#{tagName}</Link></div>
        }
        //return links for the middle paths:
        if (index === 1) {
          return <div class="nextLocation"><Link to='./'>#{tagName}</Link></div>
        }
        if (index === 2) {
          return <div class="nextLocation"><Link to='../'>#{tagName}</Link></div>
        }
        else {
          let count = '../'
          for (let j=3; j<=index;j++) {
            count += '../'
          }
          return <div class="nextLocation"><Link to ={count}>#{tagName}</Link></div>
        }
      }
      else {
        if (results.length === 1) { // only home
          return <div class="currentLocation"><Link to='/'>#home</Link></div>
        }
        else {
          return <div class="nextLocation"><Link to='/'>#home</Link></div>
        }
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