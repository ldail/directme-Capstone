//Dependencies
import React from 'react'
import {Link} from 'react-router-dom'

//Components
import getAllListingTagsByListingId from '../../../utils/getAllListingTagsByListingId'

export default function LinkListing(props) {
  let listing = props.info || {};
  let id = listing.id || 1;
  let description = (listing.description) ? listing.description : '' //it's optional, so don't dislay 'null'

  function createTagListing() {
    let results = getAllListingTagsByListingId(props,id);
    let tagList = [];
    results.tagNames.forEach(tagName => {
      tagList.push(<li class="tagName"><Link to ="#">#{tagName}</Link> </li>)
    });
    return tagList;
  }
  return (
    <li className="catListing">
      <div className="catListingNumbers">
        <div className="catListingNumbersItem">20</div>
        <div className="catListingNumbersItemBottom">^</div>
      </div>
      <div className="catListingInfo">
        <h3>{listing.name}</h3>
        <h4><a href={listing.url} target="_blank">{listing.url}</a></h4>
        <div className="tagList">
          <div className="leftSide">
            <h5>{createTagListing()}</h5>
          </div>
          <div className="rightSide">
            <span>(see more)</span>
            <span>(add tags)</span>
          </div>
        </div>
        <p>{description}</p>

        <div className="CatListingBottomRow">
          <div className="comments">
            <div className="theIcon">-icon-</div>
            <div>(15 comments)</div>
          </div>
          <div className="star">
            <div>-star-</div>
          </div>
        </div>
      </div>
    </li>
  )
}