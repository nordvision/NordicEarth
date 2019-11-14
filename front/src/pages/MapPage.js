import React from 'react'
import PropTypes from 'prop-types'

import logo from '../logo.svg'

function MapPage({ props }) {
  const berries = ['blue', 'red', 'jam', 'lingon']
  return (
    <div>
      <h1>Blueberry Jam</h1>
      <p>
        Lorem ipsum dolor amet master cleanse hella tacos street art.
      </p>
      <img src={logo} alt="logo" height={100} width={100} />
      {berries.map((berry) => (
        <li>
          {`${berry}berry`}
        </li>
      ))}
    </div>
  )
}

MapPage.propTypes = {
  
}

export default MapPage
