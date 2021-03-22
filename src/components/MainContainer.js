import React from "react"

import GameShow from './GameShow'
import ContributorsSection from './ContributorsSection'

const MainContainer = () => {
  return (
    <>
      <h1 className="header-img"><img
        src="https://fontmeme.com/permalink/210322/a4f40591d803559834ef913901e4f31a.png"
        alt="Play Stoko Wars"
      /></h1>
      <GameShow />
      <ContributorsSection/>
    </>
  );
};

export default MainContainer;