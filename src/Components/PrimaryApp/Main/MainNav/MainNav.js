//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';

export default function MainNav() {
  return (
    <section className="chooseHeader">
        <div className="active"><Link to="/?hubs">Hubs</Link></div>
        <div><Link to="/?tags">Tags</Link></div>
    </section>
  );
}