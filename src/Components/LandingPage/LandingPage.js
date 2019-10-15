//Dependencies
import React from 'react';
import { useHistory } from 'react-router-dom'

//Components
import PrimaryApp from '../PrimaryApp/PrimaryApp'

//CSS
import '../../reset.css'
import './LandingPage.css'

export default function LandingPage(props) {
  function goToLanding() {
    window.localStorage.setItem('seenLanding',true);
    props.stateChange({displayPage: PrimaryApp})
    props.props.history.push('/');
  };

  return(
    <div className="landing wrapper">

<div id="clickOver" onClick={goToLanding}></div>
<header>
    <h1>direct.me</h1>
    <h2>a modern web directory</h2>
  </header>
  <main>
    <ul>
      <li>
        find
        <span>new websites and communities</span>
      </li>
      <li>
        vote
        <span>for your favorites</span>
      </li>
      <li>
        currate
        <span>your collection of listings</span>
      </li>
      <li className="final">
        create
        <span>a better internet</span>
      </li>
    </ul>
  </main>

    </div>
  );
}