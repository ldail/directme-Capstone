//Dependencies
import React from 'react';

//Components
import Message from './Message';

//CSS
import './LandingPage.css';

export default class LandingPage extends React.Component {
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
    let highlightItems = ['top','searchBar','locationBar','firstNav','hubsCatListings','firstNav', 'hubCatListingsUl', 'lastNav','submitButton', 'middleNav', 'TagSingles', 'mainListings', 'mainListingList', 'TagSinglesUl'];

    if (this.state.message === 1) {
      if (this.props.router.location.pathname !=='/programming') { this.props.router.history.push('/programming'); }
      highlightItems.forEach(item => this.setZIndex(item,1));
      let focusItem = ['top']
      focusItem.forEach(item => this.setZIndex(item, 5));
      
      return <Message {...this.props} loadingState={this.props.state.loading} cancelState={this.cancelState} state={this.state} classInclude='first' changeMessageState={this.changeMessageState} title='Welcome to directme' message='Find new websites by any topic!' />
    }
    else if (this.state.message === 2) {
      highlightItems.forEach(item => this.setZIndex(item,1));
      let focusItem = ['searchBar']
      focusItem.forEach(item => this.setZIndex(item, 5));
      return <Message {...this.props} loadingState={this.props.state.loading} cancelState={this.cancelState} state={this.state} classInclude='second' changeMessageState={this.changeMessageState} title='Search!' message='Search any tag to find listings that match' />
    }

    else if (this.state.message === 3) {
      highlightItems.forEach(item => this.setZIndex(item,1));
      let focusItem = ['locationBar']
      focusItem.forEach(item => this.setZIndex(item, 5));
      return <Message {...this.props} loadingState={this.props.state.loading} cancelState={this.cancelState} state={this.state} classInclude='third' changeMessageState={this.changeMessageState} title='Navigate!' message='Navigate deeply into hubs without fear of getting lost.' />
    }

    else if (this.state.message === 4) {
      this.pushToHubs()
      highlightItems.forEach(item => this.setZIndex(item,1));
      return <Message {...this.props} loadingState={this.props.state.loading} cancelState={this.cancelState} state={this.state} classInclude='fourth' changeMessageState={this.changeMessageState} title='Hubs!' message={<div><p>View all of the hubs and ones nested within.</p><p>Only listings that match all the tag names will show up!</p></div>} />
    }

    else if (this.state.message === 5) {
      this.pushToListings()
      highlightItems.forEach(item => this.setZIndex(item,1));
      return <Message {...this.props} loadingState={this.props.state.loading} cancelState={this.cancelState} state={this.state} classInclude='fifth' changeMessageState={this.changeMessageState} title='Listings!' message={<div><p>See all the listings submitted!</p><p>If you're in a hub, you will be able to see all of the listings that match that hub.</p></div>} />
    }

    else if (this.state.message === 6) {
      this.pushToTags();
      highlightItems.forEach(item => this.setZIndex(item,1));
      return <Message {...this.props} loadingState={this.props.state.loading} cancelState={this.cancelState} state={this.state} classInclude='fifth' changeMessageState={this.changeMessageState} title='Tags!' message={<div><p>See all the tags collected.</p><p>If you're in a hub, you will be able to see all of the similar tags.</p></div>} />
    }

    else if (this.state.message === 7) {
      if (this.props.router.location.pathname !== '/') { this.props.router.history.push('/') }
      highlightItems.forEach(item => this.setZIndex(item,1));
      let focusItem = ['submitButton']
      focusItem.forEach(item => this.setZIndex(item, 5));
      return <Message {...this.props} loadingState={this.props.state.loading} cancelState={this.cancelState} state={this.state} classInclude='sixth' changeMessageState={this.changeMessageState} title='Submit!' message='Submit a listing. Add tags. Contribute to a better internet' />
    }

    else {

    }
  }

  async pushToHubs() {
    let focusItem = ['hubsCatListings','firstNav', 'hubCatListingsUl', 'mainPage'];
    if (this.props.router.location.search !== '?hubs') { 
      await this.props.router.history.push(`${this.props.router.location.pathname}?hubs`);
    }
    await focusItem.forEach(item => this.setZIndex(item, 5));
  }

  async pushToListings() {
    let focusItem = ['mainListings','middleNav', 'mainListingList', 'mainPage']
    if (this.props.router.location.search !== '?listings') { 
      await this.props.router.history.push(`${this.props.router.location.pathname}?listings`);
    }
    await focusItem.forEach(item => this.setZIndex(item, 5));
  }

  async pushToTags() {
    let focusItem = ['TagSingles','lastNav', 'TagSinglesUl', 'mainPage']
    if (this.props.router.location.search !== '?tags') { 
      await this.props.router.history.push(`${this.props.router.location.pathname}?tags`);
    }
    await focusItem.forEach(item => this.setZIndex(item, 5));
  }
  render() {
    if (!window.localStorage.getItem('seenLanding') && this.state.inProgress !== true) {
      window.localStorage.setItem('seenLanding',true);
      this.props.seenLandingChange();
          if (this.props.router.location.pathname !== '/' && this.props.router.location.search !== '?hubs') {
      this.props.router.history.push('/?hubs');
    }
    }
    return(
      <div className="blackBackground" id="landingSplash">
              {this.showMessage()}
      </div>
    );
  }
}