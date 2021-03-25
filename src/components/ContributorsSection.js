import React from "react";

import ContributorTile from "./ContributorTile"

const ContributorsSection = () => {
  return (
    <section className="contributors-container" id='contributors'>
      <h1 className="header-img"><img
        src="https://fontmeme.com/permalink/210322/d397da41137c989437cf6adce0f6eec6.png"
        alt="Meet the Team"
      /></h1>
      <h4 className="contributor-title-sub">
        Something Interesting and Clever About Us :)
      </h4>
      <div className="contributors-card-container">
        <ContributorTile/>
        <ContributorTile/>
        <ContributorTile/>
      </div>
    </section>
  );
};

export default ContributorsSection;