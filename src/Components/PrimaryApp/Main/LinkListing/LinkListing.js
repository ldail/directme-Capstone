//Dependencies
import React from 'react'

export default function LinkListing() {
  return (
              <li class="catListing">
          <div class="catListingNumbers">
            <div class="catListingNumbersItem">20</div>
            <div class="catListingNumbersItemBottom">^</div>
          </div>
          <div class="catListingInfo">
            <h3>First Listing Item Name - Expanded</h3>
            <h4>reactjs.com</h4>
            <div class="tagList">
              <div class="leftSide">
                <h5>#react #javascript #learn #blog #short #more #tags #here</h5>
              </div>
              <div class="rightSide">
                <span>(see more)</span>
                <span>(add tags)</span>
              </div>
            </div>
            <p>A short description goes here to let people
                know what they are going to get when 
                they enter the link. The description can 
                take up a further amount of space. </p>

            <div class="CatListingBottomRow">
              <div class="comments">
                <div class="theIcon">-icon-</div>
                <div>(15 comments)</div>
              </div>
              <div class="star">
                <div>-star-</div>
              </div>
            </div>
          </div>
        </li>
  )
}