//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';

export default function CatListing(props) {
  let currentTagId = props.info.tag_id;
  let currentTagName = props.getTagNameById(currentTagId) || ''
  let lowerCase = currentTagName.toLowerCase();
  let path = (lowerCase) => {
    if (props.router.location.pathname === '/') {
      return lowerCase;
    }
    else {
      return `${props.router.location.pathname}/${lowerCase}`
    }
  }
  let theseSubcategories = props.state.subcategory_list.filter(item => item.subcategory_to === currentTagId)
  
  function checkSubcategories() {
    if (!theseSubcategories || theseSubcategories === [] || theseSubcategories.length === 0) {
      return false;
    }
    return true;
  }

  function showSubcategories() {
    if (!checkSubcategories()) {
      return <li>(no subcategories)</li>
    }
    else {
    let mapping = theseSubcategories.map(item => {
      let link = props.getTagNameById(item.tag_id) || '';
      let lowercase = link.toLowerCase();
      let path2 = `..${props.router.location.pathname}/${lowerCase}/${lowercase}`;
      return <li className="subCategoryItem">--><Link to={path2}>{props.getTagNameById(item.tag_id)}</Link></li>;
    });
    return mapping
    }
  }

showSubcategories();

  function decideLink(lowerCase) {
    if (checkSubcategories()) {
      if (props.router.location.pathname === '/') {

        return lowerCase;
      }
      else {
        return `${props.router.location.pathname}/${lowerCase}`
      }
    }
    else {
      if (props.router.location.pathname !== '/') {
        return `${props.router.location.pathname}/${lowerCase}`
      }
      else {
        return `${lowerCase}`;
      }
  }
}

  return(
    <li className="catListing">
      <div className="catListingNumbers">
        <div className="catListingNumbersItem">20</div>
        <div className="catListingNumbersItem">12</div>
      </div>
      <div className="catListingInfo">
        <h3><Link to={() => decideLink(lowerCase)}>{currentTagName}</Link></h3>
        <h4><ul>{showSubcategories()}</ul></h4>
      </div>
    </li>
  );
}