import { Table } from "react-bootstrap";
import { useFetchData } from "../../../hooks/useFetchData";
import { PageLoading } from "../../pageLoading/pageLoading";
import { ErrorHandlingUI } from "../../common/errorHandlingUI/errorHandlingUi";
export const ViewAWTable = () => {
  const { isLoading, data: allVCs, error } = useFetchData("/getAllApprovedAw");


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

  return (
    <div>
      <Table className="tw-m-auto" bordered striped style={{ width: "90%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Qualification</th>
            <th>Year of experience</th>
          </tr>
        </thead>

        <tbody>
          {allVCs.map((vc) => {
            return (
              <tr key={vc._id}>
                <td>{vc?.name}</td>
                <td>{vc?.email}</td>
                <td>{vc?.phoneNumber}</td>
                <td>{vc?.address}</td>
                <td>{vc?.gender}</td>
                <td>{vc?.qualification}</td>
                <td>{vc?.experience}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
