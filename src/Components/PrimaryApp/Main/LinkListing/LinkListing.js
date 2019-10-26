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
    let router = props.router || {};
    let location = router.location || {};
    let path = location.pathname || '';
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
    }
  }
  return (
    <li className="listing catListing">
      <div className="catListingInfo">
      <a href={listing.url} target="_blank">
        <h3>{listing.name}</h3>
        <h4>{listing.url}</h4>
      </a>
        <div className="tagList">
          <div className="leftSide">
            <h5>{createTagListing()}</h5>
          </div>
          <div className="rightSide">
            <button type="submit" onClick={(e) => addTag(e)} className="addTagButton"></button>
          </div>
        </div>
        <AddTagForm {...props} id={id} results={results} listing={listing} />
        <p className="linkDescription">{description}</p>
      </div>
    </li>
  )
}