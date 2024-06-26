import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useFetchData } from "../../../hooks/useFetchData";
import { ParentData } from "../chatWithParent/types";
export const MySubscriptions = () => {
  const { userId, userType } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { data } = useFetchData(`/getHPsAllSubscribers/${userId}`);
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
        <p className="tw-text-red-500 tw-font-bold">No subscribers found</p>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-center text-primary">Subscribers Data</h4>
      <Table responsive className="my-subscriptions-table mt-5" bordered striped hover >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {data.map((parent: ParentData) => (
            <tr>
              <td>{parent?.name}</td>
              <td>{parent?.email}</td>
              <td>{parent?.phoneNumber}</td>
              <td>{parent?.address}</td>
              <td>{parent?.dateOfBirth}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
