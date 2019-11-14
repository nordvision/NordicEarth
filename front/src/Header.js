import React from 'react'
import {
  Link
} from 'react-router-dom'

function Header() {
  return (
    <div className="top_navigation">
      <h1>NORDIC EARTH</h1>
      <div className="top_navigation_links">
        <Link to="/">Home</Link>
        <Link to="/instructions">DIY</Link>
        <Link to="/keys">Key commands</Link>
        <Link to="/maps">Maps</Link>
        <Link to="/bonusmap">Bonus</Link>
      </div>
    </div>
  )
}

export default Header
