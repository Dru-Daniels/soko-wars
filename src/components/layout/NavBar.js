import React from "react";
import R2 from '../../assets/images/shutterstock_652557517.png'

const NavBar = () => {
  const toggleNav = () => {
    let toggle = document.getElementById("navBar");
    if (toggle.className === "nav-bar") {
      toggle.className += " responsive";
    } else {
      toggle.className = "nav-bar";
    }
  };

  return (
    <div className="nav-bar-container">
      <div className="nav-bar" id="navBar">
        <a href="/#" onClick={toggleNav}>
          <img
            id='nav-bar-r2'
            className="nav-bar-logo"
            src={R2}
            alt="R2-D2 Logo"
          />
        </a>
        <a href="/#">
          <li>PLAY</li>
        </a>
        <a href="/#">
          <li>CREATORS</li>
        </a>
        <a href="/#">
          <li>CONTACT</li>
        </a>
      </div>
    </div>
  );
};

export default NavBar;
