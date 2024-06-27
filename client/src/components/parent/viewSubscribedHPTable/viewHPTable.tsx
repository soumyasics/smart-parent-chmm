import { Button, Table } from "react-bootstrap";
import { useFetchData } from "../../../hooks/useFetchData";
import { PageLoading } from "../../pageLoading/pageLoading";
import { ErrorHandlingUI } from "../../common/errorHandlingUI/errorHandlingUi";
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';
import { RootState } from "../../../redux/store";

export const ViewSubscribedHPTable = () => {
  const {userId} = useSelector((state: RootState) => state.user)
  const { isLoading, data: allHPs, error } = useFetchData(`/getAllSubscriptionByParentId/${userId}`);
  const navigate = useNavigate();

  console.log("Data,", allHPs);
  const navigateToHPDetails = (id: string) => {
    if (id) {
      navigate(`/parent/view-hp/${id}`);
    }else {
      console.log("Id not found!")
    }
  };

  if (isLoading) {
    return (
      <div>
        <PageLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <ErrorHandlingUI />
      </div>
    );
  }
  if (allHPs && allHPs.length === 0) {
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>You haven't subscribed any health professional</h3>
      </div>
    );
  }

  return (
    <div>
      <Table className="tw-m-auto" bordered striped style={{ width: "90%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>

            <th>Phone Number</th>
            <th>Address</th>
            <th>Category</th>
            <th>View More</th>
          </tr>
        </thead>

        <tbody>
          {allHPs.map((hp) => {
            return (
              <tr key={hp._id}>
                <td>{hp?.name}</td>
                <td>{hp?.email}</td>
                <td>{hp?.phoneNumber}</td>
                <td>{hp?.address}</td>
                <td>{hp?.category}</td>
                <td>
                  <Button
                    onClick={() => {
                      navigateToHPDetails(hp._id);
                    }}
                  >
                    {" "}
                    View More
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
