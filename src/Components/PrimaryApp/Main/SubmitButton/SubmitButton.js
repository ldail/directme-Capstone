//Dependencies
import React from 'react';
import {Link} from 'react-router-dom'

export default function SubmitButton() {
  return(
    <div className="submitButton"><Link to="/?submit">submit listing</Link></div>
  );
}