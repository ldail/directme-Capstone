//Dependencies
import React from 'react';

//CSS
import './SubmitListing.css';

export default function submitListing() {
  return(
    <main className="submit-listing">
      <form className="submitLink" id="submitLink" name="submitLink">
        <legend><h3>Submit a Listing</h3></legend>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" placeholder="listing title" />
        <label htmlFor ="url">URL:</label>
        <input type="text" id="url" name="url" placeholder="http://..." />
        <label htmlFor="description">Description: </label>
        <input type="text" id="description" name="description" placeholder="description" />
        <label htmlFor="hubList">Hubs:</label>
        <input type="text" id="tag" name="tag" placeholder="+" />
        <button type="button">+</button>
        <ul>
          <li>#Javascript --Established: #programming [X]--</li>
          <li>#Tutorial [x]</li>
        </ul>

        <button type="submit">Submit</button>
        <button type="cancel">Cancel</button>
      </form>
    </main>
  );
}