import React from 'react';
import './LandingPage.css'

export default function LandingPage() {

  return(
    <div class="wrapper">

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
      <li class="final">
        create
        <span>a better internet</span>
      </li>
    </ul>
  </main>

    </div>
  );
}