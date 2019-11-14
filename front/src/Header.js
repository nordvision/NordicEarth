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
        <Link to="/keys">Keys</Link>
        <Link to="/maps">Molde</Link>
        <Link to="/maps?gps=59.357826,17.785493">Stockholm</Link>
        <Link to="/maps?gps=55.668677,12.073107">Roskilde</Link>
      </div>
    </div>
  )
}

export default Header
