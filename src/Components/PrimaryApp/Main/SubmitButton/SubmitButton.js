//Dependencies
import React from 'react';
import {Link} from 'react-router-dom'

//Components
import createPath from '../../../utils/createPath'

export default function SubmitButton(props) {
  function checkIfLanding(e) {
    if (!props.seenLanding) {
      e.preventDefault();
    }
  }
   return(
    <Link to='?submit' onClick={(e) => checkIfLanding(e)}><div id="submitButton" className="submitButton"></div></Link>
   );
}