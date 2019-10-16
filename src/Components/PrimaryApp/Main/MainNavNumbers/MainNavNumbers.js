//Dependencies
import React from 'react'

//Components
import getHubList from '../../../utils/getHubList'

export default function MainNavNumbers(props) {


  return (
    <div>
      Hub Count: {getHubList(props).length}
    </div>
  )
}