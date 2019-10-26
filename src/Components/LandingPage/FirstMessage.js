//Dependencies
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { findIconDefinition, icon } from '@fortawesome/fontawesome-svg-core'  

library.add(
  fas
);

const undo = findIconDefinition({ prefix: 'fas', iconName: 'undo' })
const undoIcon = icon(undo);

const redo = findIconDefinition({ prefix: 'fas', iconName: 'redo' })
const redoIcon = icon(redo);

const cancel = findIconDefinition({ prefix: 'fas', iconName: 'times-circle' })
const cancelIcon = icon(cancel);


const FirstMessage = (props) => {
  return (
    <div className="first message">
      <FontAwesomeIcon onClick={() => goBack(props)} className="undo" icon={undoIcon} size='2x' />
      <FontAwesomeIcon onClick={() => goForward(props)} className="redo" icon={redoIcon} size='2x' />
      <FontAwesomeIcon className="cancel" icon={cancelIcon} size='1x' />
      <h2>Welcome to directme!</h2>
      <span class="smallDivider"></span>
      <h3>Find new websites by any topic!</h3>
    </div>
  )
}

const SecondMessage = (props) => {
  return (
    <div className="second message">
      <FontAwesomeIcon onClick={() => goBack(props)} className="undo" icon={undoIcon} size='2x' />
      <FontAwesomeIcon onClick={() => goForward(props)} className="redo" icon={redoIcon} size='2x' />
      <FontAwesomeIcon className="cancel" icon={cancelIcon} size='1x' />
      <h2>Search!</h2>
      <span class="smallDivider"></span>
      <h3>Search any tag to find listing results that match!</h3>
    </div>
  );
}

const goBack = (props) => {
  let state = props.state;
  if (state.message === 1) {
    //do nothing
  }
  else {
    //get to this later
  }
}

const goForward = (props) => {
  let state = props.state;
  let currentID = state.message;
  let newID = currentID + 1;
  props.changeMessageState(newID);
}

export default { FirstMessage, SecondMessage };