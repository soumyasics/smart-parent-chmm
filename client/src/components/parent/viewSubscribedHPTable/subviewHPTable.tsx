import { Button, Form, Table } from "react-bootstrap";
import { useFetchData } from "../../../hooks/useFetchData";
import { PageLoading } from "../../pageLoading/pageLoading";
import { ErrorHandlingUI } from "../../common/errorHandlingUI/errorHandlingUi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";

export const ViewSubscribedHPTable = () => {
  const { userId } = useSelector((state: RootState) => state.user);
  const {
    isLoading,
    data: allHPs,
    error,
  } = useFetchData(`/getAllSubscriptionByParentId2/${userId}`);
  console.log("all hp", allHPs);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredHPs, setFilteredHPs] = useState<any>([]);
  const navigate = useNavigate();

  console.log("Data,", allHPs);
  const navigateToHPDetails = (id: string) => {
    if (id) {
      navigate(`/parent/view-hp-fitness/${id}`);
    } else {
      console.log("Id not found!");
    }
  };

  useEffect(() => {
    const hpFilter = selectedCategory
      ? allHPs.filter((hp) => hp.healthProfessionalId.category === selectedCategory)
      : allHPs;

    setFilteredHPs(hpFilter);
  }, [selectedCategory, allHPs]);

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
        <h3 style={{ textAlign: "center" }}>You don't have any subscriptions</h3>
      </div>
    );
  }

  return (
    <div>
      {/* <div className="w-25 mx-auto">
        <Form.Select
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
        >
          <option value="">Filter By Category</option>
          <option value="Dietitian">Dietitian</option>
          <option value="Psychiatrist">Psychiatrist</option>
        </Form.Select>
      </div> */}
      <Table
        className="tw-m-auto mt-5"
        bordered
        striped
        style={{ width: "90%" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            {/* <th>Appointment Date</th>
            <th>Appointment Time</th> */}
            <th>Category</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Qulaification</th>
            <th>Paid amount</th>
            <th>View More</th>
          </tr>
        </thead>

        <tbody>
          {filteredHPs.map((hp: any) => {
            if (hp?.healthProfessionalId.isActive === "suspended") {
              return null;
            }
            if (hp?.healthProfessionalId.category !== "Fitness Specialist") {
              return null;
            }
            console.log("hp => ", hp)
            return (
              <tr key={hp._id}>
                <td>{hp?.healthProfessionalId?.name}</td>
                {/* <td>{hp?.date?.substring(0, 10)}</td>
                <td>{hp?.date?.substring(11, 16)}</td> */}
                <td>{hp?.healthProfessionalId?.category}</td>
                <td>{hp?.healthProfessionalId?.phoneNumber}</td>
                <td>{hp?.healthProfessionalId?.email}</td>
                <td>{hp?.healthProfessionalId?.qualification}</td>
                <td>{hp?.subscriptionAmount}</td>
                <td>
                  <Button
                    onClick={() => {
                      navigateToHPDetails(hp?.healthProfessionalId?._id);
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
