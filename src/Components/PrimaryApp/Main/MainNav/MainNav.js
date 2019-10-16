//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';

export default function MainNav(props) {
  let path = props.router.location.pathname;
  console.log(path);
  return (
    <section className="chooseHeader">
        <div className="active"><Link to={`${path}?hubs`}>Hubs</Link></div>
        {path !== '/' &&
        <div><Link to={`${path}?listings`}>Listings</Link></div>
        }
        <div><Link to={`${path}?tags`}>Tags</Link></div>
    </section>
  );
}