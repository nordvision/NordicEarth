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
          <p>Lorem ipsum dolor amet pork belly schlitz aute, aliquip craft beer veniam tilde selfies dolore ennui synth vape jianbing. Bespoke chia cloud bread poke, snackwave pariatur pop-up iceland. Wayfarers adipisicing elit church-key cornhole wolf health goth. Selvage poutine banh mi, ut iceland duis palo santo microdosing letterpress tumeric affogato before they sold out ut ex. Austin mollit bicycle rights, cronut vice cred cardigan exercitation actually do raw denim. Everyday carry pour-over officia, art party mlkshk next level cray. Reprehenderit actually hot chicken kitsch mustache.</p>
          <h2>Meet the geniuses behind this project</h2>
          <img alt="geniuses 1" src={team1Image} />
          <img alt="geniuses 2" src={team2Image} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
