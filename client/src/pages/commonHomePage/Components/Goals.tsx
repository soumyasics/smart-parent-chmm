import parenting4 from "../Assets/parenting4.jpg";
import parenting5 from "../Assets/parenting5.jpg";
import parenting6 from "../Assets/parenting6.jpg";
import "./Goals.css";
function Goals() {
  return (
    <>
      <div className="goals">
        <p className="mt-5 ms-3">
          <b>OUR GOALS</b>
        </p>
      </div>
      <div className="goal-container">
        <div className="goal-row">
          <div className="goal1">
            <div className="h-50">
              <img src={parenting4} alt="Parenting" />
            </div>

            <h2 className="mt-3">Revloutionary</h2>
            <p>Parenting and Caregiving done through a new way. </p>
          </div>
          <div className="goal2">
            <div className="h-50">
              <img src={parenting5} alt="Parenting" />
            </div>
            <h2 className="mt-3">Interactive</h2>
            <p>Mold your childs behaviour through activities.</p>
          </div>
          <div className="goal3">
            <img src={parenting6} alt="Parenting" />
            <h2 className="mt-3">Expert Opinions</h2>
            <p>Our community is here to support you.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Goals;
