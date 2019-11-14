import React from 'react'
import {
  Link
} from 'react-router-dom'

function Header() {
  return (
    <div className="top_navigation">
      <h1> NORDIC EARTH</h1>
      <div className="top_navigation_links">
        <Link to="/">Home</Link>
        <Link to="/instructions">How to do it</Link>
        <Link to="/maps">Maps</Link>
      </div>
    </div>
  )
}

export default Header
