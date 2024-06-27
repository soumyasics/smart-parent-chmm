// @ts-ignore
import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../apis/axiosInstance";
export const ViewHPRating = () => {
  const { userType, userId } = useSelector((state: RootState) => state.user);
  const { id } = useParams();
  const [reviewData, setReviewData] = useState({
    rating: 0,
    review: "",
    parentId: "",
    healthProfessionalId: "",
  });

  useEffect(() => {
    if (userType === "parent" && userId && id) {
      setReviewData({
        ...reviewData,
        parentId: userId,
        healthProfessionalId: id,
      });
    }
  }, [userType, userId]);
  const changeReview = (e: any) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const ratingChanged = (newRating: number) => {
    setReviewData({ ...reviewData, rating: newRating });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (reviewData.review !== "" && reviewData.rating !== 0) {
      console.log("review dat", reviewData);
      sendDataToServer();
    } else {
      toast.error("Please provide a review and rating");
    }
  };

  const sendDataToServer = async () => {
    try {
      const res = await axiosInstance.post("addRating", reviewData);
      if (res.status === 200) {
        toast.success("Review added successfully");
      } else {
        throw new Error("Couldn't add review");
      }
    } catch (error) {
      toast.error("Couldn't add review");
    }
  };
  return (
    <div className="">
      <div
        className="mt-3 w-50 mx-auto shadow p-3"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "200px",
        }}
      >
        <div>
          <h5 className="text-center ">Review your experience </h5>
        </div>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={30}
          activeColor="#ffd700"
        />
        <form
          className="d-flex justify-content-center align-items-center mt-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            style={{ height: "33px", width: "75%" }}
            value={reviewData.review}
            id="review"
            name="review"
            onChange={changeReview}
            placeholder="Write a review"
            className="form-control"
          />
          <button type="submit" className="btn ms-5 btn-warning ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
