import "./displaySlots.css";
export const DisplaySlots = ({ slots }: any) => {
  console.log("slot", slots);
  return (
    <div
      style={{ width: "90%", minHeight: "500px" }}
      className="mt-5 shadow mx-auto py-4 shadow px-5 "
    >
      <h4 className="text-center mt-5" style={{ color: "#007c7c" }}>
        Available Slots
      </h4>

      <div className="slot-parent">
        {slots.map((slot: any, index: number) => {
          return (
            <div key={slot._id}>
              <h5 className="text-center"> Section {index + 1}</h5>

              <div className="slot-box-container">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 3, 4, 5, 6, 7, 8, 9, 10].map(
                  (i, ind) => {
                    return (
                      <div className="bg-danger slot-box"> {ind + 1}</div>
                    );
                  }
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
