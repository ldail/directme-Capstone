//Dependencies
import React from 'react';

const goBack = (props) => {
  let state = props.state;
  let message = state.message
  if (message === 1) {
    //do nothing
  }
  else {
    let newID = message - 1;
    props.changeMessageState(newID)
  }
}

export default goBack;