//Dependencies
import React from 'react'
import {Link} from 'react-router-dom'

//Components
import getAllListingTagsByListingId from '../../../utils/getAllListingTagsByListingId'
import AddTagForm from '../AddTagForm/AddTagForm'

export default function LinkListing(props) {
  let listing = props.info || {};
  let id = listing.id || 1;
  let description = (listing.description) ? listing.description : '' //it's optional, so don't dislay 'null'
  let results = getAllListingTagsByListingId(props,id)

  function createTagListing() {
    let results = getAllListingTagsByListingId(props,id);
    let tagList = [];

    //find out how many levels up we are so we can search directly from the home.
    let path = props.router.location.pathname;
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
    results.tagNames.forEach(tagName => {
    tagList.push(<li class="tagName"><Link to ={`${prePath}?tag=${tagName}`}>#{tagName}</Link> </li>)
    });
    return tagList;
  }

  function addTag(e) {
    e.preventDefault();
    let addTagState = props.state.addTag || {}
    if (addTagState !== id) {
      props.stateChange({addTag : id})
      console.log(props.state.addTag);
    }
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
            {/* <span>(see more)</span> */}
            <span><Link to="#" onClick={(e) => addTag(e)}>(add tags)</Link></span>
          </div>
        </div>
        <AddTagForm {...props} id={id} results={results} listing={listing} />
        <p>{description}</p>

        {/* <div className="CatListingBottomRow">
          <div className="comments">
            <div className="theIcon">-icon-</div>
            <div>(15 comments)</div>
          </div>
          <div className="star">
            <div>-star-</div>
          </div>
        </div> */}
      </div>
    </li>
  )
}