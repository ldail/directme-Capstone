//Dependencies
import React from 'react';
import {withRouter} from 'react-router'
import ReactLoading from 'react-loading';

//Components
import MainNav from './MainNav/MainNav';
import MainHubs from './MainHubs/MainHubs'
import MainTags from './MainTags/MainTags';
import SubmitListing from '../SubmitListing/SubmitListing'
import MainListings from './MainListings/MainListings'
import decideLoading from '../../utils/decideLoading';


class Main extends React.Component {
  checkPage = () => {

    if (this.props.location.search.includes('?tags')) {
      return <MainTags router={this.props.router} {...this.props}  />
    }

    else if (this.props.location.search.includes('?listings') || this.props.location.search.includes('?tag=')) {
      return <MainListings router={this.props.router} {...this.props} />
    }

    else if (this.props.location.search.includes('?submit')) {
      return <SubmitListing router={this.props.router} {...this.props}  />
    }

    else {
      return <MainHubs router={this.props.router} {...this.props} />
    }
  }

  decideView = () => {
    let props = this.props || {}
    let state = props.state || {}
    let error = state.error || {}
    let loading = decideLoading(props) || '';
    if (error === true) {
      return <div className="errorMessage">There has been an error! Please refresh or try again</div>
    }
    else if (loading) {
      return <div className="center"><ReactLoading className="center" type={"spinningBubbles"} color={'#a96060'} height={60} width={60} /></div>
    }
    else {
      return this.checkPage()
    }
  }

  render() {
      return(
        <main id="mainPage">
          <MainNav router={this.props.router} {...this.props}/>
          {/* <MainNavNumbers router={this.props.router} {...this.props}/> */}
          {this.decideView()}
        </main>
      );
  }
}

export default withRouter(Main);