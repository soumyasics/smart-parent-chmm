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
  } = useFetchData(`/getAllSubscriptionByParentId/${userId}`);
  console.log("all hps 17", allHPs);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredHPs, setFilteredHPs] = useState<any>([]);
  const navigate = useNavigate();

  console.log("Data,", allHPs);
  const navigateToHPDetails = (id: string) => {
    if (id) {
      navigate(`/parent/view-hp/${id}`);
    } else {
      console.log("Id not found!");
    }
  };

  useEffect(() => {
    const hpFilter = selectedCategory
      ? allHPs.filter((hp) => hp.category === selectedCategory)
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
        <h3 style={{ textAlign: "center" }}>
          You haven't subscribed any health professional
        </h3>
      </div>
    );
  }

  return (
    <div>
      <div className="w-25 mx-auto">
        <Form.Select
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
        >
          <option value="">Filter By Category</option>
          <option value="Dietitian">Dietitian</option>
          <option value="Psychiatrist">Psychiatrist</option>
          <option value="Fitness Specialist">Fitness Specialist</option>
        </Form.Select>
      </div>
      <Table className="tw-m-auto mt-5" bordered striped style={{ width: "90%" }}>
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
          {filteredHPs.map((hp: any) => {
            if (hp.isActive === "suspended") {
              return null;
            }
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
