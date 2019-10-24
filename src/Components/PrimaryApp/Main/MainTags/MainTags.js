//Dependencies
import React from 'react';
import {Link} from 'react-router-dom'

//Components
import checkPath from '../../../utils/checkPath';
import getSimilarTagsByPath from '../../../utils/getSimilarTagsByPath';

//CSS
import './MainTags.css'

export default function MainTags(props) {

  function makeTagsDisplay() {
    let path = props.router.location.pathname;
    let check = checkPath(props,path);
    if (check.missingPath === true) {
      return <li>This is not an established path yet!</li>
    }
    let tagList = getSimilarTagsByPath(props,path) || [];
    
    if (tagList.length === 0) {
      return <li>There are no tags within this hub yet!</li>
    }
    return tagList.map((item,index) => <Link to={`?tag=${item.name}`} key={index}><li>#{item.name}</li></Link>)
    // currentHub={check.currentHub} info={item} router={props.router} {...props}
  }
  return (
      <section className="TagSingles">
        <div className="tagsInfo">
          <h4>More tags connected to these:</h4>
        <ul>
          {makeTagsDisplay()}
        </ul>
        </div>
      </section>
  );
}