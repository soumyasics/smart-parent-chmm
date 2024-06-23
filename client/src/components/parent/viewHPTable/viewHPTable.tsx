import { Button, Table } from "react-bootstrap";
import { useFetchData } from "../../../hooks/useFetchData";
import { PageLoading } from "../../pageLoading/pageLoading";
import { ErrorHandlingUI } from "../../common/errorHandlingUI/errorHandlingUi";
export const ViewHPTable = () => {
  const { isLoading, data: allVCs, error } = useFetchData("/getAllApprovedHp");


  const navigateToVCDetails = (id: string) => {
    console.log("id", id)
    // navigate(`/parent/view-vc/${id}`)
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
          {allVCs.map((vc) => {
            return (
              <tr key={vc._id}>
                <td>{vc?.name}</td>
                <td>{vc?.email}</td>
                <td>{vc?.phoneNumber}</td>
                <td>{vc?.address}</td>
                <td>{vc?.category}</td>
                <td>
                  <Button onClick={() => {
                    navigateToVCDetails(vc._id)
                  }}> View More</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
