import React from "react";

import "../assets/scss/main.scss"

import NavBar from './layout/NavBar'
import Footer from './layout/Footer'
import Crawler from './Crawler'
import GameShow from './GameShow'

const App = () => {
  return (
    <>
      <Crawler />
      <NavBar />
      <GameShow />
      <Footer />
    </>
  );

}
export default App;
