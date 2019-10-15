//Dependencies
import React from 'react';

export default function CatListing() {
  return(
    <li className="catListing">
      <div className="catListingNumbers">
        <div className="catListingNumbersItem">20</div>
        <div className="catListingNumbersItem">12</div>
      </div>
      <div className="catListingInfo">
        <h3>Art</h3>
        <h4> --> Modern Art  ||  Art Exhibits || ...</h4>
      </div>
    </li>
  );
}