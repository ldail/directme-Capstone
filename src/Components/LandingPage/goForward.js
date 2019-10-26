//Dependencies
import React from 'react';


const goForward = (props) => {
  let state = props.state;
  let currentID = state.message;
  let inProgress = state.inProgress;
  if (currentID === 6) {
    props.cancelState();
  }
  else {
    let newID = currentID + 1;
    props.changeMessageState(newID);
  }
}

export default goForward;