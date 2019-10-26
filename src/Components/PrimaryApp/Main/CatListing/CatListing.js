//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';

//Components
import getHubList from '../../../utils/getHubList'
import checkPath from '../../../utils/checkPath'
import createPath from '../../../utils/createPath'

export default function CatListing(props) {
  let router = props.router || {};
  let location = router.location || {};
  let path = location.pathname || '';
  let info = props.info || {}
  let currentTagName = info.name || ''
  
  let check = checkPath(props,createPath(path,currentTagName));
  let subcategories = getHubList(props,check.currentHub) || [];

  function listSubcategories() {
    if (subcategories.length === 0) {
      return <li className="noFurtherHubs">There are no further hubs!</li>
    }
    else {
      if (subcategories[0]) {
        return subcategories.map((item,index) => {
          let path2 = createPath(path,currentTagName,item.name);
          let arrow = 'subArrow'
          if (index === subcategories.length-1) { arrow = 'subArrowLast' }
          return <Link className="subCategoryListing" key={index} to={path2}>
            <li key={index}>
              <h4 className="flex">
                <span className={arrow}></span>
                <span>{item.name}</span>
              </h4>
            </li>
            </Link>
          });
        }
      }
    }
    let path3 = createPath(path,currentTagName)
  return(
    <Link to={path3} className="catListinga">
      <li className="catListing">
      <div className="catListingTitle">
        <span className="blueArrow"></span><h3>{currentTagName}</h3>
      </div>
      <div className="catListingInfo">
        <div className="catListingNumbers">
          <Link to={`${path3}?listings`} className="catListingNumbersItem tooltip"><span className="listingCount">5 <span className="tooltiptext tTop">5 listings</span></span><span className="listingIcon"></span></Link>
          <Link to={`${path3}?tags`} className="catListingNumbersItem tooltip"><span className="listingCount">12<span className="tooltiptext tBottom">12 tags</span></span><span className="tagIcon"></span></Link>
        </div>
        <div className="catListingInfo">
          <ul>{listSubcategories()}</ul>
        </div>
      </div>
    </li>
    </Link>

  );
}