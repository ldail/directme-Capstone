//Dependencies
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { findIconDefinition, icon } from '@fortawesome/fontawesome-svg-core'  

//Components
import goBack from './goBack';
import goForward from './goForward';
import decideLoading from '../utils/decideLoading';

library.add(
  fas
);

const undo = findIconDefinition({ prefix: 'fas', iconName: 'undo' })
const undoIcon = icon(undo);

const redo = findIconDefinition({ prefix: 'fas', iconName: 'redo' })
const redoIcon = icon(redo);

const cancel = findIconDefinition({ prefix: 'fas', iconName: 'times-circle' })
const cancelIcon = icon(cancel);

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      showingMore: false
    }
  }

  
showFullMessage = () => {
  if (this.state.showingMore) {
    return <div className="viewMoreExplanation">direct.me is a way to find new websites and communities. In contrast to a search engine, the listings you can find here are voted on by users. You will be able to sort them by many options to find websites, applications, and topics that normally might not appear in your browsing. Looking within hubs provides opportunities to find new and interesting topics, while searching a multitude of tags can narrow your results to websites you never knew existed. </div>
  }
  else {
    return <span class="viewMore2">(see more)</span>
  }
}

explainFullUse = (props) => {
  if (props.state.message === 1) {
    return <div className="viewMore" onClick={() => this.setState({showingMore: true})}>{this.showFullMessage()}</div>
  }
}

  render() {
    let props = this.props;
  let fakeLoadingProp = {state: {loading: props.loadingState}};
  let loading = decideLoading(fakeLoadingProp) || '';
  if (loading) { return loading; }
    return (
      <div className={`${props.classInclude} message`}>
        <FontAwesomeIcon onClick={() => goBack(props)} className="undo" icon={undoIcon} size='2x' />
        <FontAwesomeIcon onClick={() => goForward(props)} className="redo" icon={redoIcon} size='2x' />
        <FontAwesomeIcon onClick={() => props.cancelState()} className="cancel" icon={cancelIcon} size='1x' />
        <h2>{props.title}</h2>
        <span className="smallDivider"></span>
        <h3>{props.message}</h3>
        {this.explainFullUse(props)}
      </div>
    );
  }
  }