//Dependencies
import React from 'react';
import {Link} from 'react-router-dom'

//Components
import createPath from '../../../utils/createPath'

export default function SubmitButton(props) {
   return(
    <Link to='?submit'><div id="submitButton" className="submitButton"></div></Link>
   );
}