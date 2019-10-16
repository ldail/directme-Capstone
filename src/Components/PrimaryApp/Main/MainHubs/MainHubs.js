//Dependencies
import React from 'react';

//Components
import CatListing from '../CatListing/CatListing';

export default function MainHubs(props) {

  function getCurrentPage() {
    let currentPage = 0;
    let path = props.router.location.pathname;
    if (path === '/') {
      return currentPage = 0;
    }
    else {
      let tag = path.slice(1); //could be 'programming' or 'programming/javascript/react'
      if (tag.includes('/')) { //must be multiple path 'programming/javascript' or more
        // return currentPage = 0; // - for now, just return to home page (hacky)
        //support multiple paths - in the future

        //Make sure the path is actually an established path for subcategories.
        let splitPath = tag.split('/'); //['Programming','Javascript','React']
        let nextCheck = 0;
        for (let i =0; i<splitPath.length; i++) {
          let subcategory_list = props.state.subcategory_list || []
          let tag = props.getFullTagByName(splitPath[i]) || {}
          let subs = subcategory_list.filter(item => tag.id === item.subcategory_to);
          if (!subs) {
            //could not find the established path
            return currentPage = nextCheck
          }
          nextCheck = tag.id;
        }
        currentPage = nextCheck;
      }
      let foundTag = props.state.tags.find(tagItem => {
        let check = tagItem.name || ''
        return check.toLowerCase() === tag
      });
      if (!foundTag) {
        //we will get to this later.
        // console.log('not actually a tag')
        new Error('there is an error here');
      }
      else {
        currentPage = foundTag.id
      }

    }
    return currentPage
  }
  function getHubList() {
    let currentPage = getCurrentPage();
    let subcategory_list = props.state.subcategory_list || [];
    let thisPageSubcategories = subcategory_list.filter(item => item.subcategory_to === currentPage);
    return thisPageSubcategories;
    
  };

  function makeHubDisplay() {
    if (!hubList || hubList === [] || hubList.length === 0) {
      props.router.history.push('?listings');
      return <li>There are no further hubs!</li>
    }
    return hubList.map((item,index) => <CatListing key={index} info={item} getTagById={props.getTagById} getTagByName={props.getTagByName} stateChange={props.stateChange} router={props.router} state={props.state} getTagNameById={props.getTagNameById} />)
  }

  let hubList = getHubList() || [];
  return(
      <section className="catListings">
        <ul>
        {makeHubDisplay()}
        </ul>

      </section>


  );
}