import React from "react"


const Crawler = () => {

  return (
      <div className="crawler-container" id='hideMe'>
        <div className="star-wars-intro">
            <img
              className="main-logo"
              src="https://fontmeme.com/permalink/210322/aac87b3f33fef6a2a1964d64f50d1ef5.png"
              alt=""
            />
          <div className="main-content">
            <div className="title-content">
              <p className="content-header">
                EPISODES IV-VI
                <br />A New Droid
              </p>
              <br />

              <p className="content-body">
                Oh No! R2-D2 took a wrong turn inside the Death Star. He seems to
                be trapped in a warehouse in the depths of the ship. Help him get
                out before it's too late!
              </p>
              <br />
              <p>Keep scrolling to save the day.</p>
              <br />
              <p>May the force be with you.</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Crawler;
