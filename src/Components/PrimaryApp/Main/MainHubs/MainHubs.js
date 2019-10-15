//Dependencies
import React from 'react';

//Components
import CatListing from '../CatListing/CatListing';

export default function MainHubs(props) {

  function getCurrentPage() {
    let currentPage = 0;
    //Check the path. 
    //Try to match path against a tag name from the database.
    //If it doesn't match, 
      //and it's NOT "/", display a message 'this isn't an established path yet! Try searching for this as a tag instead' including link.
      //or, if it IS "/", mark the page as "/" === subcategory_to === 0
    //If it does match, then set the subcategory_to === the matching tag_id in the db.
    let path = props.router.location.pathname;
    if (path === '/') {
      currentPage = 0;
    }
    else {
      //Take path name
      //Check if a tag
      //Find its tag id
      //Change state to current hub of that tag

      let tag = path.slice(1);
      let foundTag = props.state.tags.find(tagItem => tagItem.name.toLowerCase() === tag)
      console.log(foundTag);
      if (!foundTag) {
        //we will get to this later.
        console.log('not actually a tag')
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

  let hubList = getHubList() || [];
  return(
      <section className="catListings">
        <ul>
        {hubList.map((item,index) => <CatListing key={index} info={item} getTagById={props.getTagById} getTagByName={props.getTagByName} stateChange={props.stateChange} router={props.router} state={props.state} getTagNameById={props.getTagNameById} />)}
        </ul>

      </section>


  );
}