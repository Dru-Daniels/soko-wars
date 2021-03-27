import React from "react"

import GameShow from './GameShow'
import ContributorsSection from './ContributorsSection'
import TagSection from './TagSection'

const MainContainer = () => {
  return (
    <>
      <h1 className="header-img"><img
        src="https://fontmeme.com/permalink/210325/a3c7665f6f68395fa866952a89d1bd2a.png"
        alt="Soko Wars"
      /></h1>
      <GameShow />
      <ContributorsSection/>
      <TagSection/>
    </>
  );
};

export default MainContainer;