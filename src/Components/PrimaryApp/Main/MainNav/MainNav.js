//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';

//Components
import checkPath from '../../../utils/checkPath';
import getHubList from '../../../utils/getHubList';

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

  checkIfNoHubs = (e, noInnerHubs) => {
    if (!noInnerHubs) {
      this.changeActive('hubs');
    }
    else {
      e.preventDefault();
    }
  }
  render() {
    let props = this.props || {}
    let router = props.router || {};
    let location = router.location || {};
    let search = location.search || [];
    let path = location.pathname || '';
    let check = checkPath(props,path) // returns the currentHub (unique) id and if the path is missing.
    let hubList = getHubList(props, check.currentHub); //returns the list of categories within. Empty if none.
    let noInnerHubs = '';
    if (hubList.length === 0) { noInnerHubs = true }
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
          <Link to={`${path}?hubs`} id="firstNav" onClick={(e) => this.checkIfNoHubs(e, noInnerHubs)}><div id="firstNavDiv" className={ `${ noInnerHubs ? 'noInnerHubs' : '' } firstNav ${this.state.active.hubs ? 'active' : 'inactive'}`}>Hubs {(noInnerHubs) ? ' (0)' : '' }</div></Link>
          {path !== '/' &&
          <Link to={`${path}?listings`} id="middleNav" onClick={() => this.changeActive('listings')}><div className={`middleNav ${this.state.active.listings ? 'active' : 'inactive'}`}>Listings</div></Link>
          }
          <Link to={`${path}?tags`} id="lastNav" onClick={() => this.changeActive('tags')}><div className={`lastNav ${(this.state.active.tags ? 'active' : 'inactive')}`}>Tags</div></Link>
      </section>
    );
      }
}