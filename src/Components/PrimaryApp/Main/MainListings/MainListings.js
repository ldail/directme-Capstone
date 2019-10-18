//Dependencies
import React from 'react'

//Components
import LinkListing from '../LinkListing/LinkListing';
import checkPath from '../../../utils/checkPath';
import getListingsByTags from '../../../utils/getListingsByTags'

//CSS
import './MainListings.css';

export default class MainListings extends React.Component {

  componentDidMount() {
    console.log('mounted mainlistings');
    console.log('tags');
    console.log(this.props.state.tags);
  }
  makeListingDisplay = () => {
    let path = this.props.router.location.pathname;
    let check = checkPath(this.props,path);
    if (check.missingPath === true) {
      return <li>This is not an established path yet!</li>
    }
    if (this.props.listings.length === 0) {
      return <li>There are no listings for these tags yet!</li>
    }
    console.log('made it through');
    return this.props.listings.map((item,index) => <LinkListing key={index} currentHub={check.currentHub} info={item} router={this.props.router} {...this.props}  />)
  }
  

  render() {
    console.log('render: mainListings');
    return (
      <section className="catListings">
        <ul>
          {this.makeListingDisplay()}
        </ul>
      </section>
    )
  }
}