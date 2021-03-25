import React from "react"


const Crawler = () => {

  return (
      <div className="crawler-container" id='hideMe'>
        <div className="star-wars-intro">
            <img
              className="main-logo"
              src="https://fontmeme.com/permalink/210325/1d373870ce4bb5c9db610c54b5513133.png"
              alt="Soko Wars"
            />
          <div className="main-content">
            <div className="title-content">
              <p className="content-header">
                EPISODES IV-VI
                <br />A New Droid
              </p>
              <br />

              <p className="content-body">
                After boarding the Death Star to rescue Princess Leia, R2-D2 has been given a secret mission by the Rebel Alliance to move explosive crates to key locations.
              </p>
              <br /><br />
              <p className="content-body">Your mission is to assist R2 in destroying the Empire's ultimate weapon. But be careful, certain crates will only be activated if put in precisely the right location.</p>
              <br /><br />
              <p className="content-body">May the Force be with you.</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Crawler;
