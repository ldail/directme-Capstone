//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';

//Components
import checkPath from '../../utils/checkPath';

//CSS
import './SubmitListing.css';

export default class submitListing extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      title: '',
      url: '',
      description: '',
      addingTags: [],
      link: '',
      hub: []
    }
  }

  componentDidMount() {
    this.findHubLink();
  }

  showAddingTags = () => {
    if (this.state.addingTags.length !== 0) {
      let display = this.state.addingTags.map(tagName => {
        return <div>#{tagName.toLowerCase()} - <Link onClick={(e) => {
            e.preventDefault();
            let newAddingTags = this.state.addingTags.filter(tag => tag.toLowerCase() !== tagName.toLowerCase());
            this.setState({addingTags: newAddingTags});
          }}>[-x-]</Link></div>;
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
      hub: []
    });
    console.log('removed');
  }

  hubList = () => {
    let jsx = '';
    if (this.state.hub.length !== 0) {
      jsx = this.state.hub.map(hub => <li class="tagListingSubmit">#{hub.toLowerCase()}</li>)
    }
    return jsx;
  }

  findHubLink = () => {
    let path = this.props.router.location.pathname;
    if (path !== '/') {
      let path2 = path.slice(1);
      if (!path2.includes('/')) { //single path // e.g. programming
        this.setState({
          hub: [path2]
        })
      }
      else { //multiple paths. e.g. programming/javascript/react OR a trailing slash.
        let checkPath = path.split('/');
        let newPath = [];
        if (checkPath.includes('')) { // includes a trailing slash somewhere, probably at the end.
          console.log(checkPath);
          newPath = checkPath.filter(item => item !== '');
          console.log(newPath);
          if (newPath.length === 1) { //single path
            this.setState({
              hub: newPath
            })
          }
          else {
            this.setState({
              hub: newPath
            })
          }
        }
      }
    }
  }


  makeSubmitDisplay = () => {
    let path = this.props.router.location.pathname;
    let check = checkPath(this.props,path) // returns the currentHub (unique) id and if the path is missing.
    if (check.missingPath) {
      return <div>This is not an established path yet!</div>
    }
    else {
      
      return (
        <form className="submitLink" id="submitLink" name="submitLink">
            <legend><h3>Submit a Listing</h3></legend>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" placeholder="listing title" />
            <label htmlFor ="url">URL:</label>
            <input type="text" id="url" name="url" placeholder="http://..." />
            <label htmlFor="description">Description: </label>
            <input type="text" id="description" name="description" placeholder="description" />
            <label htmlFor="tagList">Tags:</label>
            <input type="text" id="tagList" name="tagList" placeholder="+" />
            <button type="button">+</button>
            <ul>
              <li>{this.hubList()}{this.returnHub()}</li>
              <li>{this.showAddingTags()}</li>
            </ul>

            <button type="submit">Submit</button>
            <button type="button" onClick={(e) => {
                e.preventDefault();
                this.props.router.history.push(this.props.router.location.pathname);
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