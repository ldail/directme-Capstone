//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';

export default class MainNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active : {
        hubs: true,
        listings: false,
        tags: false
      }
    }
  }
  changeActive = (tab) => {
    let currentActive = this.state.active
    let response = Object.keys(currentActive);
    response.forEach(response => {
      if (currentActive[response] === true) { currentActive[response] = false}
    });
    currentActive[tab] = true;

  }
  render() {
    let props = this.props || {}
    let router = props.router || {};
    let location = router.location || {};
    let search = location.search || [];
    let path = location.pathname || '';
    if (search.includes('?tags')) { this.changeActive('tags') }
    else if (search.includes('?listings')) { this.changeActive('listings') }
    else if (search.includes('?tag=')) { 
      if (path === '/') {
        this.changeActive('tags') 
      }
      else {
        this.changeActive('listings');
      }
    }
    else { this.changeActive('hubs') }
    return (
      <section className="chooseHeader">
          <Link to={`${path}?hubs`} id="firstNav" onClick={() => this.changeActive('hubs')}><div id="firstNavDiv" className={`firstNav ${this.state.active.hubs ? 'active' : 'inactive'}`}>Hubs</div></Link>
          {path !== '/' &&
          <Link to={`${path}?listings`} id="middleNav" onClick={() => this.changeActive('listings')}><div className={`middleNav ${this.state.active.listings ? 'active' : 'inactive'}`}>Listings</div></Link>
          }
          <Link to={`${path}?tags`} id="lastNav" onClick={() => this.changeActive('tags')}><div className={`lastNav ${(this.state.active.tags ? 'active' : 'inactive')}`}>Tags</div></Link>
      </section>
    );
      }
}