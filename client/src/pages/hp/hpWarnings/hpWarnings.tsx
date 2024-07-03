import { Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useFetchData } from "../../../hooks/useFetchData";
export const HPWarnings = () => {
  const { userId, userType } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { data } = useFetchData(`/getAllWarningByHPId/${userId}`);
  useEffect(() => {
    if (userId && userType === "healthProfessional") {
      // todo => do something
    } else {
      toast.error("Please login as health professional");
      navigate("/hp/login");
    }
  }, [userId, userType]);
  console.log("warning", data);

  if (!data || data.length === 0) {
    return (
      <div className="tw-flex tw-flex-col tw-items-center">
        <p className="tw-text-red-500 tw-font-bold">
          No Cautionary messages found.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-center text-primary">Caution messages from admin</h4>
      <div>
        {data.map((w: any, i) => (
          <Card key={i} className="mt-4">
            <Card.Body>
              <br />
              {w.warningMsg}</Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};
