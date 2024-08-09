import Modal from "react-bootstrap/Modal";
import { FC, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axiosInstance from "../../../apis/axiosInstance";
import axios from "axios";
import { toast } from "react-hot-toast";

interface ReviewModalProps {
  show: boolean;
  id: string | undefined;
  handleClose: () => void;
}
export const ReviewModal: FC<ReviewModalProps> = ({
  show,
  id,
  handleClose,
}) => {
  const [review, setReviews] = useState([]);
  useEffect(() => {
    if (!id) {
      handleClose();
      return;
    }
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(`getAllRatingByHPId/${id}`);
      if (res.status === 200) {
        const data = res?.data?.data || [];
        setReviews(data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error?.response?.data?.message || "Something went wrong!";
        toast.error(message);
      } else {
        toast.error("Check your network connection!");
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reviews and ratings</Modal.Title>
      </Modal.Header>

      {review.length === 0 ? (
        <Modal.Body>
          <p className="text-center text-primary">No Reviews found</p>
        </Modal.Body>
      ) : (
        <Modal.Body>
          <Table
            responsive
            className="my-subscriptions-table mt-5"
            bordered
            striped
            hover
          >
            <thead>
              <tr>
                <th>Reviewer name</th>
                <th>Rating</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {review.map((rev: any) => (
                <tr>
                  <td>{rev?.parentId?.name}</td>
                  <td>{rev?.rating}</td>
                  <td>{rev?.review}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      )}
    </Modal>
  );
};
