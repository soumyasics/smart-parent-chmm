import { useEffect, useState } from "react";
import { SlotBookModal } from "../slotBookModal/slotBookModal";
import { useSelector } from "react-redux";
import "./displaySlots.css";
import { RootState } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../../apis/axiosInstance";
import axios from "axios";

interface BookSlotType {
  vaccinationCenterId: string;
  parentId: string;
  vaccineId: string;
  bookingDate: string;
  kidId?: string;
}
export const DisplaySlots = ({ slots, findSlot }: any) => {
  const [show, setShow] = useState(false);

  const [bookSlotData, setBookSlotData] = useState<BookSlotType>({
    parentId: "",
    vaccinationCenterId: "",
    vaccineId: "",
    bookingDate: "",
    kidId: "",
  });
  const navigate = useNavigate();
  const { isAuthenticated, userId, userType } = useSelector(
    (state: RootState) => state.user
  );
  const handleClose = () => {
    changeBookingDate("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const changeBookingDate = (bookingDate: string) => {
    setBookSlotData((prevData) => ({
      ...prevData,
      bookingDate: bookingDate,
    }));
  };
  const changeKidId = (kidId: string) => {
    setBookSlotData((prevData) => ({
      ...prevData,
      kidId: kidId,
    }));
  }
  useEffect(() => {
    if (isAuthenticated && userType === "parent" && userId) {
      setBookSlotData((prevData) => ({
        ...prevData,
        parentId: userId,
      }));
    } else {
      toast.error("Please login again");
      navigate("/parent/login");
    }
  }, [isAuthenticated, userId, userType]);

  const handleBookSlot = (
    isSlotAvailable: boolean,
    vaccineId: string,
    vaccinationCenterId: string
  ) => {
    if (!isSlotAvailable) {
      toast.error("Slot not available");
      return;
    }

    setBookSlotData((prevData) => ({
      ...prevData,
      vaccinationCenterId,
      vaccineId,
    }));
    handleShow();
  };

  const confirmBooking = (bookingDate: string, kidId: string) => {
    setBookSlotData((prevData) => ({
      ...prevData,
      bookingDate: bookingDate,
      kidId: kidId,
    }));
    let serializedData = {
      ...bookSlotData,
      bookingDate,
      kidId,
    };
    if (
      serializedData.parentId &&
      serializedData.vaccineId &&
      serializedData.bookingDate &&
      serializedData.vaccinationCenterId
    ) {
      sendDataToServer(serializedData);
    } else {
      console.log("book slot data is not sufficient", bookSlotData);
    }
  };
  const sendDataToServer = async (data: BookSlotType) => {
    console.log("data", data);
    try {
      const res = await axiosInstance.post("bookSlot", data);
      if (res.status === 200) {
        handleClose();
        toast.success("Slot booked successfully");
      } else {
        toast.error("Some issues occured, please try again");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const msg = error?.response?.data?.message || "Something went wrong";
        toast.error(msg);
        handleClose();
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setTimeout(() => {
        findSlot();
      }, 1000);
    }
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
          return (
            <div key={slot._id}>
              <h5 className="text-center mt-4"> Section {index + 1}</h5>
              <p className="text-center">Available Slots: {availableSlots}</p>
              <div className="slot-box-container">
                {totalSlotsArray.map((_, ind) => {
                  const changeBGColor =
                    ind >= bookedSlots ? "not-booked" : "booked";

                  const isThisBookedSlot = ind >= bookedSlots;
                  return (
                    <div
                      key={ind}
                      onClick={() => {
                        handleBookSlot(
                          isThisBookedSlot,
                          slot._id,
                          slot.vaccinationCenterId
                        );
                      }}
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
        confirmBooking={confirmBooking}
        bookingDate={bookSlotData.bookingDate}
        changeBookingDate={changeBookingDate}
      />
    </div>
  );
};
