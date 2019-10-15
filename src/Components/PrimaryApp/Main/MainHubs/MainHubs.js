//Dependencies
import React from 'react';

//Components
import CatListing from '../CatListing/CatListing';

export default function MainHubs() {
  return(
      <section className="catListings">
        <ul>
          {console.log(window.location.pathname)}
        {['Arbitrary','Number','Now'].map((item,index) => <CatListing key={index} />)}
        </ul>

      </section>


  );
}