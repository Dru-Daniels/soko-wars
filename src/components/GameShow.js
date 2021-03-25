import React from "react"
import deathStarTop from '../../public/assets/deathStarTop.png'
import deathStarBottom from '../../public/assets/deathStarBottom.png'
import playBtn from '../../public/assets/play.png'
import closeBtn from '../../public/assets/close.png'

const GameShow = () => {

  const toggleDeathStar = () => {
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
      <div className='death-star-top' >
        <img src={deathStarTop} />
        <img src={playBtn} onClick={toggleDeathStar} className='death-star-play-btn' id='showToggle' />
      </div>
      <div className='death-star-btm' id='hideToggle'>
        <div className='phaser-canvas' id='phaser-parent'></div>
        <img src={closeBtn} onClick={toggleDeathStar} className='death-star-close-btn' />
      </div>
      <div className='swing'>
        <img src={deathStarBottom} />
      </div>
    </div>
  )
}

export default GameShow;