import React from "react";
import "./Freev.css";
function Freev() {
  return (
    <div className="mb-5">
      <div className="fvt mb-5">
        <p className="mt-5 ms-3">
          <b>Free Videos And Tutorials</b>
        </p>
      </div>
      <div className="free-container container">
        <div
          className="free-row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div
            className="card"
            style={{
              width: "30%",
              transition: "transform .9s",
              marginLeft: "15px",
            }}
          >
            {/* <img src="https://thumbs.dreamstime.com/b/child-care-school-care-club-children-playing-74144653.jpg?w=768" className="card-img-top" alt="video thumb" /> */}
            <div className="card-body">
              <div style={{ width: "100%" }}>
                <iframe
                  width="100%"
                  src="https://www.youtube.com/embed/0ovaWK4mONY?si=TuNUMmdMO30cl9RG"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
              <h5 className="card-title mt-3">is Child Care Expensive?</h5>
              <p className="card-text">
                Why Child Care Is So Damn Expensive Now
              </p>
              <a href="https://www.youtube.com/embed/0ovaWK4mONY?si=TuNUMmdMO30cl9RG" target='_blank' className="btn btn-primary">
                video link
              </a>
            </div>
          </div>
          <div
            className="card"
            style={{ width: "30%", transition: "transform .9s" }}
          >
            {/* <img src="..." className="card-img-top" alt="..." /> */}
            <div className="card-body">
              <div style={{ width: "100%" }}>
                <iframe
                  width="100%"
                  src="https://www.youtube.com/embed/CXWzqbe1i9c?si=4H2MHWPB3HvPRaCD"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
              <h5 className="card-title mt-3"> Take care of Children</h5>
              <p className="card-text">
                A Short Guide To Take Care Of Children
              </p>
              <a href="https://www.youtube.com/embed/CXWzqbe1i9c?si=4H2MHWPB3HvPRaCD" target='_blank' className="btn btn-primary">
                Video link
              </a>
            </div>
          </div>
          <div
            className="card"
            style={{ width: "30%", transition: "transform .9s" }}
          >
            {/* <img src="..." className="card-img-top" alt="..." /> */}
            <div className="card-body">
              <div style={{ width: "100%" }}>
                <iframe
                  width="100%"
                  src="https://www.youtube.com/embed/fojOMDS-PqI?si=3Kyc90mz_fAkE7MP"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
              <h5 className="card-title mt-3">Child Development</h5>
              <p className="card-text">
                Child Development, What is it? The 5 stages of a child
                development explained in this video.
              </p>
              <a href="https://www.youtube.com/embed/fojOMDS-PqI?si=3Kyc90mz_fAkE7MP" target='_blank' className="btn btn-primary">
                Video link
              </a>
            </div>
          </div>
          {/* <div
            className="card"
            style={{
              width: "18rem",
              transition: "transform .9s",
              marginRight: "15px",
            }}
          >
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Video title</h5>
              <p className="card-text">short description of video content</p>
              <a href="#" className="btn btn-primary">
                Video link
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Freev;
