import React from "react"

import {showDS} from '../utils/GameOverUtil'

import deathStarTop from '../../public/assets/deathStarTop.png'
import deathStarBottom from '../../public/assets/deathStarBottom.png'
import playBtn from '../../public/assets/play.png'
import closeBtn from '../../public/assets/close.png'
import finalScene from '../../public/assets/finalScene.mp4'

const GameShow = () => {

  const toggleDeathStar = () => {
    showDS()
    let toggle = document.getElementById("hideToggle");
    let toggleBtn = document.getElementById("showToggle");
    if (toggle.style.display === "flex") {
      toggle.style.display = 'none'
      toggleBtn.style.display = 'flex'
    } else {
      toggleBtn.style.display = 'none'
      toggle.style.display = "flex";
    }
  }

  return (
    <div id="phaser-container" >
      <div className='death-star-top' id='gameDiv' >
        <img src={deathStarTop} className='ds-top-sm' id='dsTop'/>
        <img src={playBtn} onClick={toggleDeathStar} className='death-star-play-btn' id='showToggle' />
      </div>
      <div className='death-star-btm' id='hideToggle'>
        <video autoPlay muted width="500px" height="500px" preload="metadata"  id="myVideo">
          <source allowFullScreen preload='auto' type="video/mp4" src={finalScene} />
        </video>
        <div className='phaser-canvas' id='phaser-parent'></div>
        <img src={closeBtn} onClick={toggleDeathStar} className='death-star-close-btn'/>
      </div>
      <div className='swing'>
        <img src={deathStarBottom} className='ds-btm-sm' id='dsBtm'/>
      </div>
    </div>
  )
}

export default GameShow;