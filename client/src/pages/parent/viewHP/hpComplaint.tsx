// @ts-ignore
import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../apis/axiosInstance";
export const HPComplaint = () => {
  const { userType, userId } = useSelector((state: RootState) => state.user);
  const { id } = useParams();
  const [complaintData, setComplaintData] = useState({
    complaint: "",
    parentId: "",
    healthProfessionalId: "",
  });

  useEffect(() => {
    if (userType === "parent" && userId && id) {
      setComplaintData({
        ...complaintData,
        parentId: userId,
        healthProfessionalId: id,
      });
    }
  }, [userType, userId]);
  const changeReview = (e: any) => {
    const { name, value } = e.target;
    setComplaintData({ ...complaintData, [name]: value });
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (complaintData.complaint !== "" ) {
      console.log("review dat", complaintData);
      sendDataToServer();
    } else {
      toast.error("Please enter your complaint");
    }
  };

  const sendDataToServer = async () => {
    try {
      const res = await axiosInstance.post("addComplaint", complaintData);
      if (res.status === 200) {
        toast.success("Complaint sent successfully. We will resolve it soon");
        setComplaintData({ ...complaintData, complaint: "" });
      } else {
        throw new Error("Couldn't complaint. Try again later");
      }
    } catch (error) {
      toast.error("Couldn't add review");
    }
  };
  return (
    <div className="">
      <div
        className="mt-3 mx-auto shadow p-3"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "200px",
        }}
      >
        <div>
          <h5 className="text-center ">Write your Complaint here </h5>
        </div>
       
        <form
          className="d-flex justify-content-center align-items-center mt-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            style={{ height: "33px", width: "75%" }}
            value={complaintData.complaint}
            id="review"
            name="complaint"
            onChange={changeReview}
            placeholder="Write your complaint"
            className="form-control"
          />
          <button type="submit" className="btn ms-5 btn-danger ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
