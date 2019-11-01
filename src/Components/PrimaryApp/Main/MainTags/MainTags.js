//Dependencies
import React from 'react';
import {Link} from 'react-router-dom'
import extractDomain from 'extract-domain'

//Components
import checkPath from '../../../utils/checkPath';
import getSimilarTagsByPath from '../../../utils/getSimilarTagsByPath';

//CSS
import './MainTags.css'

export default function MainTags(props) {

  function makeTagsDisplay() {
    let path = props.router.location.pathname;
    let check = checkPath(props,path);
    let state = props.state || {};
    let listings = state.listings || {};
    if (check.missingPath === true) {
      return <li>This is not an established path yet!</li>
    }
    let tagList = getSimilarTagsByPath(props,path) || [];
    let showList = tagList.filter(tag => {
      let find = listings.find(listing => {
        let extracted = extractDomain(listing.url)
        return extracted === tag.name
      });
      if (!find) {
        return tag
      }
    })
    
    if (showList.length === 0) {
      return <li>There are no tags within this hub yet!</li>
    }
    return showList.map((item,index) => <Link to={`?tag=${item.name}`} key={index} className="tagListingItem"><li><span className="insideBox">#{item.name}</span></li></Link>)
    // currentHub={check.currentHub} info={item} router={props.router} {...props}
  }

  return (
      <section id="TagSingles" className="TagSingles">
        <div className="tagsInfo">
          <h4>{props.router.location.pathname==='/' ? `All` : `Similar`} tags (by popularity):</h4>
        <ul id="TagSinglesUl">
          {makeTagsDisplay()}
        </ul>
        </div>
      </section>
  );
}