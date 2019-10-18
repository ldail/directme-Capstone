//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';


//Finds matching tags based off of a listing ID
//Returns {array of all the tags IDs, array of all the tag names}
export default function getAllListingTagsByListingId(props, listingId) {
    let state = props.state || {}
    let id = listingId || 1;
    let listings = state.listings || []
    let tags = state.tags || []
    let listingCopyWithAllTags = listings.filter(listing => listing.id === id);
    let tagIds = listingCopyWithAllTags.map(listing => listing.tag_id);
    let tagNames = tagIds.map(tagId => tags.find(tag => tag.id === tagId).name);
    return {tagIds,tagNames}
}