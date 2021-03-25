import React from "react"

import GameShow from './GameShow'
import ContributorsSection from './ContributorsSection'

const MainContainer = () => {
  return (
    <>
      <h1 className="header-img"><img
        src="https://fontmeme.com/permalink/210325/5a0ff56d9f13a06e47b7cb9b47c71f85.png"
        alt="Play Stoko Wars"
      /></h1>
      <GameShow />
      <ContributorsSection/>
    </>
  );
};

export default MainContainer;