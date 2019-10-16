//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';

export default function MainNav(props) {
  let path = props.router.location.pathname;
  return (
    <section className="chooseHeader">
        <div className="active"><Link to={`${path}?hubs`} onClick={() => props.stateChange({displayTab: '?hubs'})}>Hubs</Link></div>
        {path !== '/' &&
        <div><Link to={`${path}?listings`} onClick={() => props.stateChange({displayTab: '?listings'})}>Listings</Link></div>
        }
        <div><Link to={`${path}?tags`}  onClick={() => props.stateChange({displayTab: '?tags'})}>Tags</Link></div>
    </section>
  );
}