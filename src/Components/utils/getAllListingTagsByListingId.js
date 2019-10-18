//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';

export default function getAllListingTagsByListingId(props, listingId) {
    let id = listingId || 1;
    let listingCopyWithAllTags = props.state.listings.filter(listing => listing.id === id);
    let tagIds = listingCopyWithAllTags.map(listing => listing.tag_id);
    let tagNames = tagIds.map(tagId => props.state.tags.find(tag => tag.id === tagId).name);
    let tagList = [];
    tagNames.forEach(tagName => {
      tagList.push(<li class="tagName"><Link to ="#">#{tagName}</Link> </li>)
    });
    return tagList;
  }