//Dependencies
import React from 'react';

//Components
import Message from './Message';

//CSS
import './LandingPage2.css';

export default class LandingPage2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 1,
      inProgress: true
    }
  }

  changeMessageState = (newMessageId) => {
    this.setState({ message: newMessageId});
  }

  cancelState = () => {
    this.setState({ inProgress: false});
  }

  setZIndex= (elementId, newIndex) => {
    let zElement = document.getElementById(elementId) || {};
    let zElementStyle = zElement.style || {};
    zElementStyle.zIndex = newIndex || {};
  }

  showMessage = () => {
    let highlightItems = ['top','searchBar','locationBar','firstNav','hubsCatListings','firstNav', 'hubCatListingsUl', 'lastNav','submitButton'];

    if (this.state.message === 1) {
      highlightItems.forEach(item => this.setZIndex(item,1));
      let focusItem = ['top']
      focusItem.forEach(item => this.setZIndex(item, 5));
      
      return <Message cancelState={this.cancelState} state={this.state} classInclude='first' changeMessageState={this.changeMessageState} title='Welcome to directme' message='Find new websites by any topic!' />
    }
    else if (this.state.message === 2) {
      highlightItems.forEach(item => this.setZIndex(item,1));
      let focusItem = ['searchBar']
      focusItem.forEach(item => this.setZIndex(item, 5));
      return <Message cancelState={this.cancelState} state={this.state} classInclude='second' changeMessageState={this.changeMessageState} title='Search!' message='Search any tag to find listings that match' />
    }

    else if (this.state.message === 3) {
      highlightItems.forEach(item => this.setZIndex(item,1));
      let focusItem = ['locationBar']
      focusItem.forEach(item => this.setZIndex(item, 5));
      return <Message cancelState={this.cancelState} state={this.state} classInclude='third' changeMessageState={this.changeMessageState} title='Navigate!' message='Navigate deeply into hubs without fear of getting lost.' />
    }

    else if (this.state.message === 4) {
      highlightItems.forEach(item => this.setZIndex(item,1));
      let focusItem = ['hubsCatListings','firstNav', 'hubCatListingsUl']
      focusItem.forEach(item => this.setZIndex(item, 5));
      return <Message cancelState={this.cancelState} state={this.state} classInclude='fourth' changeMessageState={this.changeMessageState} title='Hubs!' message={<div><p>View all of the hubs and ones nested within.</p><p>Only listings that match all the tag names will show up!</p></div>} />
    }

    else if (this.state.message === 5) {
      highlightItems.forEach(item => this.setZIndex(item,1));
      let focusItem = ['hubsCatListings','lastNav', 'hubCatListingsUl']
      focusItem.forEach(item => this.setZIndex(item, 5));
      return <Message cancelState={this.cancelState} state={this.state} classInclude='fifth' changeMessageState={this.changeMessageState} title='Tags!' message={<div><p>See all the tags collected.</p><p>If you're in a hub, you will be able to see all of the similar tags.</p></div>} />
    }

    else if (this.state.message === 6) {
      highlightItems.forEach(item => this.setZIndex(item,1));
      let focusItem = ['submitButton']
      focusItem.forEach(item => this.setZIndex(item, 5));
      return <Message cancelState={this.cancelState} state={this.state} classInclude='sixth' changeMessageState={this.changeMessageState} title='Submit!' message='Submit a listing. Add tags. Contribute to a better internet' />
    }

    else {

    }
  }

  render() {
    if (!window.localStorage.getItem('seenLanding') && this.state.inProgress !== true) {
      window.localStorage.setItem('seenLanding',true);
      this.props.seenLandingChange();
    }
    return(
      <div className="blackBackground" id="landingSplash">
              {this.showMessage()}
      </div>
    );
  }
}