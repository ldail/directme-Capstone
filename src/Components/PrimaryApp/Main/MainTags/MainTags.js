//Dependencies
import React from 'react';

//Components
import checkPath from '../../../utils/checkPath';

//CSS
import './MainTags.css'

export default function MainTags(props) {

  function makeTagsDisplay() {
    let path = props.router.location.pathname;
    let check = checkPath(props,path);
    if (check.missingPath === true) {
      return <li>This is not an established path yet!</li>
    }
    return 'here we are';
    // if (filteredListings.length === 0) {
    //   return <li>There are no listings for these tags yet!</li>
    // }
    // return filteredListings.map((item,index) => <li currentHub={check.currentHub} info={item} router={props.router} {...props}  />)
  }
  return (
    makeTagsDisplay()
  )
    // <section className="tab-main">
      {/* <h3>Popular</h3>
      <section className="TagCombos">
        <div className="TagHeading">
        <h4>Tag combos:</h4>
        <h5>(see more)</h5>
        </div>

        <div className="TagComboItem">
          <p>#React n #Javascript</p>
          <ul>
            <li>-->#Learn</li>
            <li>-->#Drills</li>
            <li>-->#Help</li>
          </ul>
        </div>

        <div className="TagComboItem">
            <p>#SQL n #Javascript</p>
            <ul>
              <li>-->#knex</li>
              <li>-->#database</li>
              <li>-->#tutorial</li>
            </ul>
          </div>

          <div className="TagComboItem">
              <p>#CSS n #Reset</p>
              <ul>
                <li>-->#Normalize</li>
                <li>-->#Import</li>
              </ul>
            </div>

      </section> */}

      {/* <section className="TagSingles">
        <ul>
          <li>#Javascript</li>
          <li>#Developer</li>
          <li>Freelance</li>
          <li>#React</li>
          <li>#Thinkful</li>
          <li>#CSS</li>
        </ul>
      </section>
    </section>
  ); */}
}