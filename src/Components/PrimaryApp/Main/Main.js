//Dependencies
import React from 'react';
import {useLocation} from 'react-router-dom';
import {withRouter} from 'react-router'

//Components
import MainNav from './MainNav/MainNav';
import MainNavNumbers from './MainNavNumbers/MainNavNumbers'
import MainHubs from './MainHubs/MainHubs'
import MainTags from './MainTags/MainTags';
import SubmitListing from '../SubmitListing/SubmitListing'
import MainListings from './MainListings/MainListings'

class Main extends React.Component {
  checkPage = () => {

    if (this.props.location.search.includes('?tags')) {
      return <MainTags router={this.props.router} {...this.props}  />
    }

    else if (this.props.location.search.includes('?listings')) {
      return <MainListings router={this.props.router} {...this.props}/>
    }

    else if (this.props.location.search.includes('?submit')) {
      return <SubmitListing />
    }

    else {
      return <MainHubs router={this.props.router} {...this.props} />
    }
  }

  render() {
    let pageDisplay = this.checkPage();
      return(
        <main>
          <MainNav router={this.props.router} {...this.props}/>
          <MainNavNumbers router={this.props.router} {...this.props}/>
          {pageDisplay}
        </main>
      );
  }
}

export default withRouter(Main);