//Dependencies
import React from 'react';
import {Link} from 'react-router-dom'

export default function HeaderTitle(props) {
  return(
      <div className="titles">
        <h1><Link to="/">direct.me</Link></h1>
        <h2><Link to="/">a modern web directory</Link></h2>
      </div>
  );
}