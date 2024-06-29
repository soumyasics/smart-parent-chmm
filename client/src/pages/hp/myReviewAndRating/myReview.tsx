import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useFetchData } from "../../../hooks/useFetchData";
export const MyReviewAndRating = () => {
  const { userId, userType } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { data } = useFetchData(`/getAllRatingByHPId/${userId}`);
  useEffect(() => {
    if (userId && userType === "healthProfessional") {
      // todo => do something
    } else {
      toast.error("Please login as health professional");
      navigate("/hp/login");
    }
  }, [userId, userType]);

  if (!data || data.length === 0) {
    return (
      <div className="tw-flex tw-flex-col tw-items-center">
        <p className="tw-text-red-500 tw-font-bold">No Reviews found</p>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-center text-primary">Reviews and ratings</h4>
      <Table
        responsive
        className="my-subscriptions-table mt-5
      "
        bordered
        striped
        hover
      >
        <thead>
          <tr>
            <th>No.</th>
            <th>Reviewer name</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Reviewer Email</th>
            <th>Reviewer Phone number</th>
          </tr>
        </thead>
        <tbody>
          {data.map((rev: any, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{rev?.parentId?.name}</td>
              <td>{rev?.rating}</td>
              <td>{rev?.review}</td>
              <td>{rev?.parentId?.email}</td>
              <td>{rev?.parentId?.phoneNumber}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
