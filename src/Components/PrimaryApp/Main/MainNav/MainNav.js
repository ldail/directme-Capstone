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
    let path = this.props.router.location.pathname;
    if (this.props.location.search.includes('?tags')) { this.changeActive('tags') }
    else if (this.props.location.search.includes('?listings')) { this.changeActive('listings') }
    else if (this.props.location.search.includes('?tag=')) { 
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
          <Link to={`${path}?hubs`} onClick={() => this.changeActive('hubs')}><div className={`firstNav ${this.state.active.hubs ? 'active' : 'inactive'}`}>Hubs</div></Link>
          {path !== '/' &&
          <Link to={`${path}?listings`} onClick={() => this.changeActive('listings')}><div className={`middleNav ${this.state.active.listings ? 'active' : 'inactive'}`}>Listings</div></Link>
          }
          <Link to={`${path}?tags`} onClick={() => this.changeActive('tags')}><div className={(this.state.active.tags ? 'active' : 'inactive')}>Tags</div></Link>
      </section>
    );
      }
}