//Dependencies
import React from 'react';

export default function SortOptions() {
  return(
    <footer>
      <ul className="sortOptions">
        <li className="activeSort">popularity</li>
        <li>alpha</li>
        <li>most comments</li>
        <li>most links</li>
        <li>newest</li>
        <li className="divider"></li>
        <li>time</li>
      </ul>
    </footer>
  );
}