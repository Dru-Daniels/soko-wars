import React from 'react'

const TagSection = () => {
  return(
    <div className="tag-section" id='contact'>
      <a href='https://github.com/Dru-Daniels/soko-wars' target='blank' className='tooltip'>
        <span class="tooltiptext">Fork Our Repository</span>
        <i class="fab fa-github-alt"></i>
      </a>
      <a href='https://www.mintbean.io/' target='blank' className='tooltip'>
        <span class="tooltiptext">Checkout Mintbean</span>
        <img className='mintbean-logo' src="https://kanreact.netlify.app/static/media/mintbean.cf18b629.png"/>
      </a>
    </div>
  )
}

export default TagSection