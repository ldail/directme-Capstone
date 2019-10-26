//Dependencies
import React from 'react';
import {Link} from 'react-router-dom'

//Components
import checkPath from '../../../utils/checkPath'

export default class LocationBar extends React.Component {

  render() {
  let props = this.props
  let router = props.router || {};
  let location = router.location || {};
  let path = location.pathname || '';
  let results = ['home'];
  let checkPathFunction = checkPath(props,path);
  if (!checkPathFunction.missingPath) {
    results = findPath(props);
  }

  return(
    <section id="locationBar" className="locationBar">
        {makePath(props,results)}
        <div className="lineBar"></div>
    </section>
  );
  }
}

function makePath(props,results) {
  let router = props.router || {};
  let location = router.location || {};
  let path = location.pathname || '';
    let paths = results.map((tagName,index) => {
      console.log(results);
      if (index !== results.length-1) { // on the last one
        if (index === 0) { //if we're on the current page
          if (!results[1]) {
            return <div key={index} className="currentLocation"><Link to={`${path}`}>#{tagName}</Link></div>
          }
          else {
            return <div key={index}><div className="currentLocation"><Link to={`${path}`}>#{tagName}</Link></div><span className="yellowArrow"></span></div>
          }
        }
        //return links for the middle paths:
        if (index === 1) {
          if (!results[index+1]) {
            return <div key={index} className="nextLocation"><Link to='./'>#{tagName}</Link></div>
          }
          else {
            return <div key={index}><div className="nextLocation"><Link to='./'>#{tagName}</Link></div><span className="yellowLine"></span></div>
          }
        }
        if (index === 2) {
          if (!results[index+1]) {
            return <div key={index} className="nextLocation"><Link to='../'>#{tagName}</Link></div>
          }
          else {
            return <div key={index}><div className="nextLocation"><Link to='../'>#{tagName}</Link></div><span className="yellowLine"></span></div>
          }
        }
        else {
          let count = '../'
          for (let j=3; j<=index;j++) {
            count += '../'
          }
          if (!results[index+1]) {
            return <div key={index} className="nextLocation"><Link to ={count}>#{tagName}</Link></div>
          }
          else {
            return <div key={index} ><div className="nextLocation"><Link to ={count}>#{tagName}</Link></div><span className="yellowLine"></span></div>
          }
        }
      }
      else {
        if (results.length === 1) { // we're at the home page
          return <div key={index} className="currentLocation"><Link to='/'>home</Link></div>
        }
        else { // pointing to the home page
          return <div key={index} className="nextLocation"><Link to='/'>home</Link></div>
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