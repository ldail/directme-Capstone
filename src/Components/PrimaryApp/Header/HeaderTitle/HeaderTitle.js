//Dependencies
import React from 'react';
import {Link} from 'react-router-dom'

export default function HeaderTitle(props) {
  function onClickEvent() {
    props.stateChange({currentHub: 0, displayTab: '?hubs'});
  }
  return(
      <div className="titles">
        <h1><Link to="/" onClick={onClickEvent}>direct.me</Link></h1>
        <h2><Link to="/" onClick={onClickEvent}>a modern web directory</Link></h2>
      </div>
  );
}