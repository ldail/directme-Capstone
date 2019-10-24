//Dependencies
import React from 'react';

//Components
import checkPath from '../../../utils/checkPath';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked : true,
      hubTags: []
    }
  }
  
  submitSearch() {

    //If they're keeping the hub as part of the search results, check it.
    let path = this.props.router.location.pathname;
    let check = checkPath(this.props,path);
    // let searchTags = [];
    // if (!check.missingPath) {
    //   if (this.state.checked) {
    //     if (path === '/') {
    //       this.setState({hubTags : []})
    //     }
    //     else {
    //       let newPath = path.slice(1)
    //       if (!path.includes('/')) { //single path
    //         searchTags = [newPath];
    //         this.setState({hubTags: searchTags});
    //       }
    //       else { //multiple paths
    //         let finalPath = newPath.split('/');
    //         searchTags = finalPath.filter(pathName => pathName !== '');
    //         this.setState({hubTags: searchTags});
    //       }
    //     }
    //   }
    // }

    //Gather the tags in the searchBar
    let searchTerms = this.state.searchTerms;
    let termsArray = searchTerms.split(' ').map(term => {
      if (term[0] === '#') {
        return term.slice(1)
      }
      return term;
    })

    let searchString = '?tag=';
    termsArray.forEach((term,index) => {
      if (index === 0) {
        searchString += term
      }
      else {
        searchString += `&${term}`
      }
    });

    if (this.state.checked && !check.MissingPath) {
      searchString = `${path}${searchString}`
    }
    else {
      //check how many levels up we are in path.
      let prePath = '';
      if (path !== '/') {
        if (path.includes('/')) {
          let newPath = path.split('/');
          newPath = newPath.filter(item => item !== '')
          newPath.forEach(path => {
            prePath += '../';
          })
        }
      }

      searchString = `${prePath}${searchString}`
    }

    this.props.router.location.pathname = '/';
    this.props.router.history.push(searchString);



  }

  render() {
    return(
      <section className="searchBar">
        <form id="searchTag" name="searchTag" onSubmit={(e) => {
          e.preventDefault();
          this.submitSearch();
        }}>
        <input type="text" id="searchInput" placeholder="#tags #here" onChange={(e) => this.setState({searchTerms: e.target.value})} />
        <div className="keepHub">
          <input type="checkbox" id="keep" name="keep" checked={this.state.checked} onChange={() => this.setState({checked: !this.state.checked})} />
          <label htmlFor="keep">Stay in hub?</label>
        </div>
        </form>
      </section>
    );
  }
}