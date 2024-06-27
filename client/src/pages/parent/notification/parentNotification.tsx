import Accordion from "react-bootstrap/Accordion";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../apis/axiosInstance";
export const ParentNotification = () => {
  const navigate = useNavigate();
  const { userId, userType } = useSelector((state: RootState) => state.user);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    if (!userId || !userType) {
      navigate("/parent/login");
      return;
    }
    getParentNotifications(userId);
  }, [userId, userType]);

  const getParentNotifications = async (parentId: string) => {
    try {
      const response = await axiosInstance.get(
        `getVaccinationScheduleByParentId/${parentId}`
      );
      const data = response?.data?.data || [];
      setNotifications(data);
    } catch (err) {
      console.log("Eror on getting parent notification", err);
    }
  };
  console.log("notifi", notifications);
  return (
    <div>
      <h3 className="text-center">Notifications </h3>
      <Accordion defaultActiveKey="0">
        {notifications.map((n: any) => {
          return (
            <Accordion.Item className="mt-5" key={n._id} eventKey="0">
              <Accordion.Header>
                Message from {n.vaccinationCenterId?.name || ""} vaccination
                center
              </Accordion.Header>
              <Accordion.Body>
                <p>Next Vaccine {n.message}</p>

                <p>
                  Next vaccination date: {n.nextBookingDate.substring(0, 10)}
                </p>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}

        <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
