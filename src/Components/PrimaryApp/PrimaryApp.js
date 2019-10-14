//Dependencies
import React from 'react';

//Components
import HeaderTitle from '../HeaderTitle/HeaderTitle';
import InfoBox from '../InfoBox/InfoBox';
import AccountBox from '../AccountBox/AccountBox';

//CSS
import './PrimaryApp.css'

export default function PrimaryApp() {

  return(
    <div class="main wrapper">
        <header>
    <section class="top">
      <HeaderTitle />
      <InfoBox />
      <AccountBox />
    </section>
    <section class="searchBar">
      <input type="text" placeholder="search..." />
    </section>
    <section class="locationBar">
      <div class="currentLocation">[home]</div>
      <div class="lineBar"></div>
    </section>
  </header>


  <main>
    <section class="chooseHeader">
      <div class="active">Hubs</div>
      <div>Tags</div>
    </section>
    <section class="catListings">
      <ul>

        <li class="catListing">
          <div class="catListingNumbers">
            <div class="catListingNumbersItem">20</div>
            <div class="catListingNumbersItem">12</div>
          </div>
          <div class="catListingInfo">
            <h3>Art</h3>
            <h4> --> Modern Art  ||  Art Exhibits || ...</h4>
          </div>
        </li>

        <li class="catListing">
            <div class="catListingNumbers">
              <div class="catListingNumbersItem">14</div>
              <div class="catListingNumbersItem">8</div>
            </div>
            <div class="catListingInfo">
              <h3>Automotive</h3>
              <h4> --> Parts  ||  Exhibits  || ...</h4>
            </div>
          </li>

          <li class="catListing">
              <div class="catListingNumbers">
                <div class="catListingNumbersItem">32</div>
                <div class="catListingNumbersItem">15</div>
              </div>
              <div class="catListingInfo">
                <h3>Lorem</h3>
                <h4> --> Ipsum  ||  Art Dolorem || ...</h4>
              </div>
            </li>

            <li class="catListing">
                <div class="catListingNumbers">
                  <div class="catListingNumbersItem">20</div>
                  <div class="catListingNumbersItem">12</div>
                </div>
                <div class="catListingInfo">
                  <h3>Test</h3>
                  <h4> --> Test Art  ||  Art Testing || ...</h4>
                </div>
              </li>
      </ul>

    </section>
    <div class="submitButton">submit listing</div>
  </main>

  <footer>
    <ul class="sortOptions">
      <li class="activeSort">popularity</li>
      <li>alpha</li>
      <li>most comments</li>
      <li>most links</li>
      <li>newest</li>
      <li class="divider"></li>
      <li>time</li>
    </ul>
  </footer>
    </div>
  );
}