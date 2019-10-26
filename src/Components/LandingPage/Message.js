//Dependencies
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { findIconDefinition, icon } from '@fortawesome/fontawesome-svg-core'  

//Components
import goBack from './goBack';
import goForward from './goForward';

library.add(
  fas
);

const undo = findIconDefinition({ prefix: 'fas', iconName: 'undo' })
const undoIcon = icon(undo);

const redo = findIconDefinition({ prefix: 'fas', iconName: 'redo' })
const redoIcon = icon(redo);

const cancel = findIconDefinition({ prefix: 'fas', iconName: 'times-circle' })
const cancelIcon = icon(cancel);


const Message = (props) => {
  return (
    <div className={`${props.classInclude} message`}>
      <FontAwesomeIcon onClick={() => goBack(props)} className="undo" icon={undoIcon} size='2x' />
      <FontAwesomeIcon onClick={() => goForward(props)} className="redo" icon={redoIcon} size='2x' />
      <FontAwesomeIcon onClick={() => props.cancelState()} className="cancel" icon={cancelIcon} size='1x' />
      <h2>{props.title}</h2>
      <span class="smallDivider"></span>
      <h3>{props.message}</h3>
    </div>
  )
}

export default Message;