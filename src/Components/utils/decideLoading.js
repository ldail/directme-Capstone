//Dependencies
import React from 'react'
import ReactLoading from 'react-loading';

const decideLoading = (props) => {
  if (props.state.loading) {
    return <div className="center"><ReactLoading className="center" type={"spinningBubbles"} color={'#a96060'} height={60} width={60} /></div>
  }
}

export default decideLoading;
