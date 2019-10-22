//Dependencies
import React, { Component } from 'react'
import {withRouter} from 'react-router'
import {Route} from 'react-router-dom'
import config from './config'

//Components
import LandingPage from './Components/LandingPage/LandingPage';
import PrimaryApp from './Components/PrimaryApp/PrimaryApp';
import SubmitButton from './Components/PrimaryApp/Main/SubmitButton/SubmitButton'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayPage: LandingPage,
      currentHub: 0,
      tags: [],
      addTag: 0
    }
  }

  stateChange = (newState) => { 
    console.log('stateChange');
    console.log(newState);
    this.setState({
      ...newState
    });
  }


  addListing = (listing) => {
    let bodyText = JSON.stringify(listing);
    return fetch (`${config.API_ENDPOINT}/listings`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: bodyText
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('error in fetch!')
      }
      return res.json();
    })
    .catch(e => console.log('error in fetch command'));
  }

  addTagListing = (tagListing) => {
    let bodyText = JSON.stringify(tagListing);
    return fetch (`${config.API_ENDPOINT}/tag-listings`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(tagListing)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('error in fetch!')
      }
      return res.json();
    })
    .catch(e => console.log('error in fetch command'));
  }

  addNewTag = (name) => {
    return fetch (`${config.API_ENDPOINT}/tags/${name}`, {
      method: 'POST',
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
    return fetch (`${config.API_ENDPOINT}/listings/tag/${tag_id}`, {
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
      return resJson
    })
    .catch(e => console.log('error'));
  }

  getListingByListingId = (listing_id) => {
    return fetch (`${config.API_ENDPOINT}/listings/listing/${listing_id}`, {
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
    let hubLinks = [];
    let hubTags = [];
    let tags = [];
    let listings = [];
    let tagCount = [];
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
    .then(hubLinksRes => {
      hubLinks = hubLinksRes;
    })
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
      .then(hubTagsRes => {
        hubTags = hubTagsRes;
      })
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
      .then(tagsRes => {
        tags=tagsRes
      })
      .catch(e => console.error('there was an error'));
    })
    .then(() => {
      return fetch(`${config.API_ENDPOINT}/listings`, {
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
      .then(listingsRes => {
        listings=listingsRes
      })
      .catch(e => console.error('there was an error'));
    })
    .then(() => {
      return fetch (`${config.API_ENDPOINT}/tagCount`, {
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
        tagCount = resJson;
      })
      .catch(e => console.log('error'));
    })
    .then(() => this.setState({hubLinks: hubLinks,hubTags: hubTags,tags: tags, listings: listings, tagCount: tagCount}))
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
        <this.state.displayPage addListing={this.addListing} addTagListing={this.addTagListing} addNewTag={this.addNewTag} router={this.props} stateChange={this.stateChange} getTagCountByPopularity={this.getTagCountByPopularity} getListingByListingId={this.getListingByListingId} getListingByTagId={this.getListingByTagId} getFullTagById={this.getFullTagById} getFullTagByName={this.getFullTagByName} getTagNameById={this.getTagNameById} state={this.state} getTagById={this.getTagById} getTagByName={this.getTagByName} />
    )
  }
}

export default withRouter(App);