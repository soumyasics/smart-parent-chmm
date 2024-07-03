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

      const revData = data.reverse();
      setNotifications(revData);
    } catch (err) {
      console.log("Eror on getting parent notification", err);
    }
  };

 
  return (
    <div>
      <h3 className="text-center">Notifications </h3>
      <Accordion defaultActiveKey="0">
        {notifications.map((n: any, index) => {
          return (
            <Accordion.Item className="mt-5" key={n._id} eventKey={`${index}`}>
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

     
      </Accordion>
    </div>
  );
};
