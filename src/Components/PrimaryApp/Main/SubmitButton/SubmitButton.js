//Dependencies
import React from 'react';
import {Link} from 'react-router-dom'

//Components
import createPath from '../../../utils/createPath'
import checkPath from '../../../utils/checkPath';

export default function SubmitButton(props) {
  // let path = props.router.location.pathname;
  // console.log(path);
  // let check = checkPath(props,path) //makes sure path is valid. If not, returns {missingPath: true}
  // console.log(check);

  // function pathway() {
  //   if (check.missingPath === true) {
  //     console.log('missing path');
  //     path = '/';
  //   }
  //   return createPath(props,path);
  // }
  
  return(
    <div className="submitButton"><Link to={`x`}>submit listing</Link></div>
  );
}