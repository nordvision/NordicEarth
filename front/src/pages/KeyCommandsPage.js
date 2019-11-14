import React from 'react'

import './KeyCommandsPage.scss'
import Header from '../Header'

function KeyCommands() {
  return (
    <div>
      <Header />
      <div className="KeyCommandsPage">
        <div className="KeyCommandsPage_inner">
          <h1>Key commands for the map</h1>
          <ul>
            <li><p>&uarr; tilts the camera down</p></li>
            <li><p>&darr; tilts the camera up</p></li>
            <li><p>&larr; rotates the camera counter-clockwise</p></li>
            <li><p>&rarr; rotates the camera clockwise</p></li>
            <li>q zooms in</li>
            <li>a zooms out</li>
            <li>z rotates the camera left</li>
            <li>x rotates the camera right</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default KeyCommands
