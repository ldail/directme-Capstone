//Dependencies
import React from 'react'

//Components
import LinkListing from '../LinkListing/LinkListing';
import checkPath from '../../../utils/checkPath';
import getListingsByTags from '../../../utils/getListingsByTags'

//CSS
import './MainListings.css';

export default class MainListings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: []
    }
  }

  componentDidMount() {
    console.log('state');
    console.log(this.state);
    getListingsByTags(this.props, this.props.router.location.pathname)
                    .then(resJson => {
                      console.log(resJson);
                      this.setState({listings: resJson})
                    });
  }

  makeListingDisplay = () => {
    let path = this.props.router.location.pathname;
    let check = checkPath(this.props,path);
    if (check.missingPath === true) {
      return <li>This is not an established path yet!</li>
    }
    if (this.state.listings.length === 0) {
      return <li>There are no listings for these tags yet!</li>
    }
    console.log('made it through');
    return this.state.listings.map((item,index) => <LinkListing key={index} currentHub={check.currentHub} info={item} router={this.props.router} {...this.props}  />)
  }
  

  render() {
    return (
      <section className="catListings">
        <ul>
          {this.makeListingDisplay()}
        </ul>
      </section>
    )
  }
}