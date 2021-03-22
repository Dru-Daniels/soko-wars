import React from "react";

import "../assets/scss/main.scss"

import NavBar from './layout/NavBar'
import Footer from './layout/Footer'
import Crawler from './Crawler'
import MainContainer from './MainContainer'
const App = () => {
  return (
    <>
      <Crawler />
      <NavBar />
      <MainContainer />
      <Footer />
    </>
  );

}
export default App;
