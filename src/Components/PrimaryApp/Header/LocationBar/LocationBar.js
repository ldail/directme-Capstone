//Dependencies
import React from 'react';

export default function LocationBar(props) {
  let path = props.router.location.pathname;
  let currentRoute = '';
  let totalPath = ['home'];
  if (path === '/') {
    currentRoute = <div className="currentLocation">{totalPath[0]}</div>
  }
  else {
    let fullPath = path.split('/').filter(item=> item !== "");
    fullPath.forEach(path=> {
      if (!props.getFullTagByName(path)) {
        return currentRoute = <div className="currentLocation">{totalPath[0]}</div>
      }
      else {
        totalPath.push(path);
      }
    })
    console.log(`totalPath is`)
    console.log(totalPath);
  }
  return(
    <section className="locationBar">
      {currentRoute}
      <div className="lineBar"></div>
    </section>
  );
}


//Read the path
//Separate by '/'
//Only display the tree if it's an accurate subcategory path:
  //Start with deepest link {e.g. 'react' in programming/javascript/react}, check if it's a tag matched to a subcategory in subcategory_to
  //Continue this process until the subcategory_to === 0. IF it's true, then show the display. If not, just show home and set state home to 0;
