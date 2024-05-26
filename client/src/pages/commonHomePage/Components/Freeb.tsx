import { Button } from "react-bootstrap";
function Freeb() {
  
  return (
    <>
      <div className="fb mb-5 ms-5">
        <p style={{ fontSize: "35px" }}>
          <b>Free Blogs To Read</b>
        </p>
      </div>
      <div className="free-container container">
      <div
                  className="card"
                  style={{ width: "18rem", transition: "transform .9s" }}
                  
                >
                  <img src="https://picsum.photos/200/300" alt="child" style={{ height: "200px" }} />
                  <div className="card-body text-center">
                    <h5 className="card-title">title</h5>

                    <Button
                    >
                      {" "}
                      View More
                    </Button>
                  </div>
                </div>

      </div>
    </>
  );
}

export default Freeb;
