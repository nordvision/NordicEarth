import React from 'react'
import {
  Route, Link
} from 'react-router-dom'

import MapPage from './pages/MapPage'
import InstructionsPage from './pages/InstructionsPage'

function Header() {
  const padding = { padding: 5 }
  return (
    <div>
      <Link style={padding} to="/">Home</Link>
      <Link style={padding} to="/instructions">How to do it</Link>
      <Route exact path="/" render={() => <MapPage />} />
      <Route exact path="/instructions" render={() => <InstructionsPage />} />
    </div>
  )
}

export default Header
