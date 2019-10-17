//Dependencies
import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import config from './config'

//Components
import LandingPage from './Components/LandingPage/LandingPage';
import PrimaryApp from './Components/PrimaryApp/PrimaryApp';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayPage: LandingPage,
      displayTab: '?hubs',
      currentHub: 0,
      tags: []
    }
  }

  stateChange = (newState) => { 
    this.setState({
      ...newState
    });
  }

  getTagNameById = (tag_id) => {
    let tag = this.state.tags.find(tag => tag.id === tag_id) || {};
    return tag.name;
  }

  getFullTagByName = (tag_name = '') => {
    let tag = this.state.tags.find(tag  => {
      if (!tag.name) {
        let testName = '';
        return testName.toLowerCase() === tag_name.toLowerCase();
       }
       else {
        return tag.name.toLowerCase() === tag_name.toLowerCase()
       }
    });
    return tag;
  }

  getFullTagById = (tag_id) => {
    let tag = this.state.tags.find(tag => tag.id === tag_id) || {};
    return tag;
  }

  getTagByName = (name) => {
    fetch(`${config.API_ENDPOINT}/getTagByName/${name}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('This is an error');
      }
      res.json();
    })
    .then(resJson => resJson)
    .catch(e => new Error('there was an error!'));
  }

  getTagById = (id) => {
    fetch(`${config.API_ENDPOINT}/getTagById/${id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('This is an error');
      }
      res.json();
    })
    .then(resJson => resJson)
    .catch(e => new Error('there was an error!'));
  }

  getAllListings = () => {
    fetch (`${config.API_ENDPOINT}/listings`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('error in fetch!')
      }
      return res.json();
    })
    .then(resJson => resJson)
    .catch(e => console.log('error'));
  }

  getListingByTagId = (tag_id) => {
    fetch (`${config.API_ENDPOINT}/listings/tag/${tag_id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('error in fetch!')
      }
      return res.json();
    })
    .then(resJson => {
      return resJson;
    })
    .catch(e => console.log('error'));
  }

  getListingByListingId = (listing_id) => {
    fetch (`${config.API_ENDPOINT}/listings/listing/${listing_id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('error in fetch!')
      }
      return res.json();
    })
    .then(resJson => resJson)
    .catch(e => console.log('error'));
  }

  componentDidMount() {
    this.checkPage();

    //Connect to API
    //Gather the hubs / subcategory list since that is the initial display (this.state.displayTab:'?hubs')
    fetch (`${config.API_ENDPOINT}/getHubLinks`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('error in fetch!')
      }
      return res.json();
    })
    .then(hubLinks => this.setState({hubLinks}))
    .then(() => {
      return fetch (`${config.API_ENDPOINT}/getHubTags`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('error in fetch!')
        }
        return res.json();
      })
      .then(hubTags => this.setState({hubTags}))
    })
    .then(() => {
      return fetch(`${config.API_ENDPOINT}/allTags`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('error in fetch!')
        }
        return res.json();
      })
      .then(tags => this.setState({tags}))
      .catch(e => console.error('there was an error'));
    })
    .catch(e=> console.error('there was an error'));
  }

  //Check if local storage has been set indicating that the landing page has been seen.
  checkPage() {
    if (!window.localStorage.getItem('seenLanding')) { 
      this.setState({seenLanding: 'true'})
      window.localStorage.setItem('seenLanding',true);
    }
    else {
      this.setState({seenLanding: true, displayPage: PrimaryApp})
    }
  }

  render() {
    return (
        <Route path="/" render={(e) => 
          <this.state.displayPage router={e} stateChange={this.stateChange} getListingByListingId={this.getListingByListingId} getListingByTagId={this.getListingByTagId} getFullTagById={this.getFullTagById} getFullTagByName={this.getFullTagByName} getTagNameById={this.getTagNameById} state={this.state} getTagById={this.getTagById} getTagByName={this.getTagByName} />} />
    )
  }
}
