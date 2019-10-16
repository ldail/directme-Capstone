//Dependencies
import React from 'react';

export default function LocationBar(props) {
  let path = props.router.location.pathname;
  let routeListing = '';
  // let routeArray = [];
  let totalPath = ['home'];
  if (path === '/') {
    routeListing = <div className="currentLocation">{totalPath[0]}</div>
  }
  else {
    let fullPath = path.split('/').filter(item=> item !== "");
    // console.log(fullPath);
    fullPath.forEach(path=> {
      //check if each in the path is an actual tag
      if (!props.getFullTagByName(path)) {
        //Catches if it's not a tag.
        return routeListing = <div className="currentLocation">{totalPath[0]}</div>
      }

    });
  }
  return(
    <section className="locationBar">
      {routeListing}
      <div className="lineBar"></div>
    </section>
  );
}

  //Start with deepest link {e.g. 'react' in programming/javascript/react}, check if it's a tag matched to a subcategory in subcategory_to
  //Continue this process until the subcategory_to === 0. IF it's true, then show the display. If not, just show home and set state home to 0;
