//Dependencies
import React from 'react';
import {Link} from 'react-router-dom'

//Components
import createPath from '../../../utils/createPath'

export default function SubmitButton(props) {
  let path = createPath(props.router.location.pathname,'?submit')
  return(
    <div className="submitButton"><Link to={path}>submit listing</Link></div>
  );
}