import { useState } from "react";
import { SlotBookModal } from "../slotBookModal/slotBookModal";
import "./displaySlots.css";
export const DisplaySlots = ({ slots }: any) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleBookSlot = () => {
    handleShow();
  };
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
          const totalSlots = slot.totalSlots;
          const bookedSlots = slot.bookedSlots;
          const availableSlots = totalSlots - bookedSlots;

          const totalSlotsArray = Array.from(
            { length: totalSlots },
            (_, i) => i + 1
          );
          console.log("avail", slot.totalSlots);
          return (
            <div key={slot._id}>
              <h5 className="text-center mt-4"> Section {index + 1}</h5>

              <div className="slot-box-container">
                {totalSlotsArray.map((_, ind) => {
                  const changeBGColor =
                    ind > bookedSlots ? "not-booked" : "booked";
                  return (
                    <div
                      key={ind}
                      onClick={handleBookSlot}
                      className={`${changeBGColor} slot-box`}
                    >
                      {" "}
                      {ind + 1}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <SlotBookModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  );
};
