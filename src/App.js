//Dependencies
import React, { Component } from 'react'
import {withRouter} from 'react-router'
import config from './config'

//Components
import LandingPage from './Components/LandingPage/LandingPage';
import PrimaryApp from './Components/PrimaryApp/PrimaryApp';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentHub: 0,
      tags: [],
      addTag: 0,
      error: false,
      loading: true
    }
  }

  stateChange = (newState) => { 
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
    .catch(() => {
      this.setState({error: true});
    });
  }

  addTagListing = (tagListing) => {
    return fetch (`${config.API_ENDPOINT}/tag_listings`, {
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
    .catch(e => {
      this.setState({error: true});
    });
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
    .catch(() => {
      this.setState({error: true});
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

  componentDidMount() {
    let hubLinks = [];
    let hubTags = [];
    let tags = [];
    let listings = [];
    let tagCount = [];
    //Connect to API
    //Gather the hubs / subcategory list since that is the initial display (this.state.displayTab:'?hubs')
    fetch (`${config.API_ENDPOINT}/hub_links`, {
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
      return fetch (`${config.API_ENDPOINT}/hub_tags`, {
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
      return fetch(`${config.API_ENDPOINT}/tags`, {
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
      .catch(() => {
        this.setState({error: true});
      });
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
      .catch(() => {
        this.setState({error: true});
      });
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
      .catch(() => {
        this.setState({error: true});
      });
    })
    .then(() => this.setState({hubLinks: hubLinks,hubTags: hubTags,tags: tags, listings: listings, tagCount: tagCount, loading: false}))
    .catch(() => {
      this.setState({error: true});
    });
  }

  render() {
    return (
      <PrimaryApp addListing={this.addListing} addTagListing={this.addTagListing} addNewTag={this.addNewTag} router={this.props} stateChange={this.stateChange} getTagCountByPopularity={this.getTagCountByPopularity} getFullTagById={this.getFullTagById} getFullTagByName={this.getFullTagByName} getTagNameById={this.getTagNameById} state={this.state} />
    )
  }
}

export default withRouter(App);