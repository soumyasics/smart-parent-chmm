import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { PageLoading } from "../../../components/pageLoading/pageLoading";
import { ErrorHandlingUI } from "../../../components/common/errorHandlingUI/errorHandlingUi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect } from "react";

export const ViewVaccines = () => {
  const { isAuthenticated, userId, userType } = useSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || !userId || userType !== "vaccineCenter") {
      navigate("/vc/login");
    }
  }, []);

  const {
    isLoading,
    data: vaccines,
    error,
  } = useFetchData(`getAllVaccinesByCenterId/${userId}`);

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
      <h4 className="text-center">Vaccine Details</h4>
      <Table className="tw-m-auto" bordered striped style={{ width: "90%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>

            <th>Total Slots</th>
            <th>Age Group</th>
            <th>Dosage (ml)</th>
          </tr>
        </thead>

        <tbody>
          {vaccines.map((vc) => {
            return (
              <tr key={vc._id}>
                <td>{vc?.vaccineName}</td>
                <td>{vc?.vaccineDescription}</td>
                <td>{vc?.numberOfAvailableSlots}</td>
                <td>{vc?.ageGroup}</td>
                <td>{vc?.dosageMl}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
