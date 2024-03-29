//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';
import extractDomain from 'extract-domain'

//Components
import checkPath from '../../utils/checkPath';
import onlyUnique from '../../utils/onlyUnique';

//CSS
import './SubmitListing.css';

export default class submitListing extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      tagError: false,
      urlError: false,
      title: '',
      url: '',
      description: '',
      addingTags: [],
      link: '',
      hub: [],
      tagText: '',
      focus: false,
      submitting: false
    }
  }

  checkUrl = (e) => {
    let url = e.target.value.toLowerCase();
    if (!url.startsWith('http://')) { this.setState({urlError: true }) }
    else { 
      let listings = this.props.state.listings;
      let previousUrls = listings.map(listing => listing.url);
      let removeHttp = previousUrls.map(url => {
        let final = url;
        if (url.startsWith('http://')) {
          final = final.slice(7);
        }
        if (final.startsWith('www.')) {
          final = final.slice(4);
        }
        return final;
      })
      url = url.slice(7);
      if (url.startsWith('www.')) {
        url = url.slice(4);
      }
      if (url[url.length-1] === '/') {
        url = url.slice(0,url.length-1)
      }
      let find = removeHttp.find(match => match === url)
      if (find) {
        this.setState({urlDuplicateError: true, urlError: false, url: e.target.value})
      }
      else {
      this.setState({urlError: false, url: e.target.value, urlDuplicateError: false})
      }
  }
}

  submitForm = (e) => {
    if (this.state.focus) { // focused on the tag input. Submitting at this point only adds a tag.
      e.preventDefault();
    }
    else { 
      e.preventDefault();
      this.setState({submitting: true});
      if (this.state.addingTags.length === 0 && this.state.hub.length === 0) {
        this.setState({tagError: true});
      }
      else {
        if (!this.state.urlError && !this.state.urlDuplicateError && !this.state.tagError) {
          let newAdding = this.state.addingTags;

          if (!this.state.tagError) {
            let listings = this.props.state.listings;
            //find the listing ID (=== highest listing currently then add one)
            let highestID = 0;
            listings.forEach(listing => {
              if (listing.id > highestID) { highestID = listing.id }
            })
            let newListingId = highestID + 1;

            let submitListingObject = {name: this.state.title, url: this.state.url, description: this.state.description};
            this.props.addListing(submitListingObject);

            //Check if Tags exist. If not, add them.

            //add the domain as a 'hidden tag'
            let addingUrl = extractDomain(this.state.url)
            newAdding.push(addingUrl);

            //add the title as individual tags
            let titleTags = this.state.title.split(' ');
            titleTags.forEach(tag => newAdding.push(tag));

            let addingTags = newAdding.filter(onlyUnique);
            let hub = this.state.hub;
            let allTags = this.props.state.tags;
            let listingTagList = [];


            // let addingTags be a full array of all the tags assigned to this listing
            if (hub.length !== 0) {
              addingTags = addingTags.concat(hub);
            }

            //go through each of the tags.
            //check if it exists. If not, add the tag into the API db.
            //we'll add the tags to the state at the end altogether.
            addingTags.forEach(tagName => { 
              let find = '';
              let tagId = '';
              find = allTags.find(tag => {
                if (tag.name) {
                  return tag.name.toLowerCase() === tagName.toLowerCase()
                }
              })
              if (!find) { //add tag to list

                //add to API and the local variable
                allTags =  [
                  ...allTags,
                  {id: allTags.length+1, name: tagName}
                ];
                this.props.addNewTag(tagName)
                  .then(tagReturn => {
                    this.props.addTagListing({listing_id: newListingId, tag_id: tagReturn.id });
                  });
                tagId = allTags.length;
              }
              else {
                tagId = find.id;
                this.props.addTagListing({listing_id: newListingId, tag_id: tagId});
              }
              let submitListingObject = {name: this.state.title, url: this.state.url, description: this.state.description, id: newListingId, listing_id: newListingId, tag_id: tagId}
              listingTagList.push(submitListingObject);
            });
            this.props.stateChange({
              listings: [
                ...listings,
                ...listingTagList
              ],
              tags: allTags
            });
            this.props.router.history.push('/');
          }
        }
      }
    }
  }

  addTag = (submitting) => {
    if (!this.state.tagError && this.state.tagText !== '') {
      if (this.state.hub.includes(this.state.tagText.toLowerCase()) || this.state.addingTags.includes(this.state.tagText.toLowerCase())) {
        this.setState({tagError: true})
      }
      else {
        let newAdding = [
          ...this.state.addingTags,
          this.state.tagText.toLowerCase()
        ];
        this.setState({
          addingTags: [
            ...this.state.addingTags,
            this.state.tagText.toLowerCase()
          ]
        })
        this.setState({
          tagText: ''
        });
      }
    }
  }

  validateTag = (e) => {
      //check for only numbers and letters
      let letters = /^[0-9a-zA-Z]+$/
      if (e.target.value.match(letters) || e.target.value === '') {
        this.setState({tagError: false, tagText: e.target.value});
      }
      else {
        this.setState({tagError: true});
      }
  }

  componentDidMount() {
    this.findHubLink();
  }

  showAddingTags = () => {
    if (this.state.addingTags.length !== 0) {
      let display = this.state.addingTags.map((tagName,index) => {
        return <div key={index} className="tagName" onClick={(e) => {
          e.preventDefault();
          let newAddingTags = this.state.addingTags.filter(tag => tag.toLowerCase() !== tagName.toLowerCase());
          this.setState({addingTags: newAddingTags, tagError: false});
        }}>#{tagName.toLowerCase()}</div>;
        });
      return display;
    }
  }

  returnHub = () => {
    if (this.state.hub.length !== 0) {
      return <Link onClick={(e) => this.removeHub(e)}>[-x-]</Link>
    }
  }

  removeHub = (e) => {
    e.preventDefault();
    this.setState({
      hub: [],
      tagError: false,
    });
  }

  hubList = () => {
    let jsx = '';
    if (this.state.hub.length !== 0) {
      jsx = this.state.hub.map(hub => <li className="tagListingSubmit tagName" onClick={(e) => this.removeHub(e)}>#{hub.toLowerCase()}</li>)
    }
    return jsx;
  }

  findHubLink = () => {
    let props = this.props || {};
    let router = props.router || {}
    let location = router.location || {};
    let path = location.pathname || '';
    if (path !== '/') {
      let path2 = path.slice(1);
      if (!path2.includes('/')) { //single path // e.g. programming
        this.setState({
          hub: [path2.toLowerCase()]
        })
      }
      else { //multiple paths. e.g. programming/javascript/react OR a trailing slash.
        let checkPath = path.split('/');
        let lowerCase = checkPath.map(item => item.toLowerCase())
        let newPath = [];
        if (lowerCase.includes('')) { // includes a trailing slash somewhere, probably at the end.
          newPath = lowerCase.filter(item => item !== '');
            this.setState({
              hub: newPath
            });
          }
        }
      }
    }


  makeSubmitDisplay = () => {
    let props = this.props || {};
    let router = props.router || {}
    let location = router.location || {};
    let history = router.history || {push: function() {}};
    let path = location.pathname || '';
    let check = checkPath(this.props,path) // returns the currentHub (unique) id and if the path is missing.
    if (check.missingPath) {
      return <div>This is not an established path yet!</div>
    }
    else {
      
      return (
        <form className="submitLink" id="submitLink" name="submitLink" onSubmit={(e) => this.submitForm(e)}>
            <legend><h3>Submit a Listing</h3></legend>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" placeholder="listing title" onChange={(e) => this.setState({title: e.target.value})} required />
            <label htmlFor ="url">URL:</label>
            <input type="text" id="url" name="url" placeholder="http://..." onChange={(e) => this.checkUrl(e)} required/>
            {this.state.urlError && <div className="errorMessage">Please enter a URL starting with 'http://'</div>}
            {this.state.urlDuplicateError && <div className="tagError">This listing URL has been submitted before! Cannot duplicate</div>}
            <label htmlFor="description">Description: </label>
            <textarea id="description" name="description" placeholder="description" onChange={(e) => this.setState({description: e.target.value})}/>
            <label htmlFor="tagList">Tags:</label>
            {this.state.tagError && <div className="errorMessage">Please enter a new tag that that only has letters and numbers!</div>}
            <input type="text" id="tagList" value={this.state.tagText} onChange={(e) => this.validateTag(e)} onFocus={() => this.setState({focus: true})} onBlur={() => this.setState({focus: false})} name="tagList" placeholder="+" />
            <button type="submit" className="smallAddTagButton" onClick={(e) => {
              e.preventDefault();
              this.addTag()}}></button>
            <ul>
              <li className="hubListTags">{this.hubList()}</li>
              {this.state.hub.length !== 0 ? <li className="smallDivider"></li> : <div></div>}
              <li>{this.showAddingTags()}</li>
            </ul>

            <button type="submit" id="submitTheForm">Submit</button>
            <button type="button" id="cancelTheForm" onClick={(e) => {
                e.preventDefault();
                history.push(location.pathname);
              }}>Cancel</button>
          </form>
      );
    }

  }

  render() {
    return(
      <main className="submit-listing">
        {this.makeSubmitDisplay()}
      </main>
    );
  }
}