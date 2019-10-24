//Dependencies
import React from 'react';
import {Link} from 'react-router-dom'

//Components
import createPath from '../../../utils/createPath'

export default function SubmitButton(props) {
  // let path = props.router.location.pathname;

  
   return(
    <Link to='?submit'><div className="submitButton"></div></Link>
   );
}