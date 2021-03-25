import React from "react";

import druPic from "../assets/images/DruPic.png"
import ohadPic from '../assets/images/OhadPic.png'
import rossPic from "../assets/images/RossPic.png"

const ContributorsSection = () => {
  return (
    <section className="contributors-container" id='contributors'>
      <h1 className="header-img contributors-header-img"><img
        src="https://fontmeme.com/permalink/210322/d397da41137c989437cf6adce0f6eec6.png"
        alt="Meet the Team"
      /></h1>
      <h4 className="contributor-title-sub">
        We are passionate about creating experiences that are technically impressive and easy to use.
      </h4>
      <div className="contributors-card-container">

        <div className="contributor-card">
          <div className="">
            <img src={ohadPic} alt='Creator Dru Daniels'className="contributor-img"/>
          </div>
          <div className="contributor-card-content">
            <p className="contributor-card-name">Ohad Porat</p>
            <h6 className="contributor-card-fact">Star Wars Spirit Animal: Yoda</h6>
            <div className='contributor-link-container'>
              <a href='https://www.linkedin.com/in/ohad-porat/' target="_blank" >
                <i className="fab fa-linkedin"/>
              </a>
              <a href='https://github.com/ohad-porat' target="_blank" >
              <i className="fab fa-github"/>
              </a>

            </div>
          </div>
        </div>

        <div className="contributor-card">
          <div className="">
            <img src={druPic} alt='Creator Dru Daniels'className="contributor-img"/>
          </div>
          <div className="contributor-card-content">
          <p className="contributor-card-name">Dru Daniels</p>
            <h6 className="contributor-card-fact">Star Wars Spirit Animal: Yoda</h6>
            <div className='contributor-link-container'>
              <a href='https://www.linkedin.com/in/dru-daniels/' target="_blank" >
                <i className="fab fa-linkedin" />
              </a>
              <a href='https://github.com/Dru-Daniels' target="_blank" >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="contributor-card">
          <div className="">
            <img src={rossPic} alt='Creator Dru Daniels'className="contributor-img"/>
          </div>
          <div className="contributor-card-content">
            <p className="contributor-card-name">Ross Hurlock</p>
            <h6 className="contributor-card-fact">Star Wars Spirit Animal: Yoda</h6>
            <div className='contributor-link-container'>
              <a href='https://www.linkedin.com/in/rosshurlock/' target="_blank" >
                <i className="fab fa-linkedin" />
              </a>
              <a href='https://github.com/hurlockr' target="_blank" >
                <i className="fab fa-github"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContributorsSection;