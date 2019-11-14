import React from 'react'

import './HomePage.scss'
import Header from '../Header'
import team1Image from '../assets/team1.png'
import team2Image from '../assets/team2.png'
import hmWireframe from '../assets/hm_wireframe.png'
import hmOverflate from '../assets/hm_overflate.png'
import hmTekstur from '../assets/hm_tekstur.png'

/* eslint-disable max-len */

function HomePage() {
  return (
    <div>
      <Header />
      <div className="HomePage">
        <div className="HomePage_inner">
          <h1>Experience the magic of Nordic Earth</h1>
          <p>Nordic Earth gives you the power to generate 3D images from ortographic photos. By combining topographic data with satelite images you can generate awesome 3D images. You can pan around in the 3D universe and explore points of interest.</p>
          <h2>What is it</h2>
          <ul>
            <li>As a journalist, you can use this expert tool to generate 3D image from a point of interest.</li>
            <li>You can also make cool CGI panoramic content for your videos or articles.</li>
          </ul>
          <h2>Meet the geniuses behind this project</h2>
          <img alt="geniuses 1" src={team1Image} />
          <img alt="geniuses 2" src={team2Image} />
          <h2>Extreme topography</h2>
          <img alt="height map wireframe" src={hmWireframe} />
          <img alt="height map overflate" src={hmOverflate} />
          <img alt="height map texture" src={hmTekstur} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
