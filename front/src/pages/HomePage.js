import React from 'react'

import './HomePage.scss'
import Header from '../Header'
import team1Image from '../assets/team1.png'
import team2Image from '../assets/team2.png'

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
        </div>
      </div>
    </div>
  )
}

export default HomePage
