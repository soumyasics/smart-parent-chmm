import { Table } from "react-bootstrap";
import { useFetchData } from "../../../hooks/useFetchData";
import { PageLoading } from "../../../components/pageLoading/pageLoading";
import { ErrorHandlingUI } from "../../../components/common/errorHandlingUI/errorHandlingUi";
export const ViewParentTable = () => {
  const { isLoading, data: allParents, error } = useFetchData("/getAllParents");

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
      <h3 className="text-center text-primary mt-3">All Parents</h3>
      <Table className="tw-m-auto mt-5" bordered striped style={{ width: "90%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>

            <th>Phone Number</th>
            <th>Address</th>
            <th>Vaccinated Status</th>
          </tr>
        </thead>

        <tbody>
          {allParents.map((p) => {
            return (
              <tr key={p?._id}>
                <td>{p?.name}</td>
                <td>{p?.email}</td>
                <td>{p?.phoneNumber}</td>
                <td>{p?.address}</td>
                <td>{p?.isVaccinated ? "Vaccinated" : "Not Vaccinated"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
