import React from 'react'
import PropTypes from 'prop-types'
import {
  Route, Link
} from 'react-router-dom'

import MapPage from './pages/MapPage'
import InstructionsPage from './pages/InstructionsPage'

function Header({ props }) {
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

Header.propTypes = {
}

export default Header
