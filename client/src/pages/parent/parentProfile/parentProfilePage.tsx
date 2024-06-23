// ProfilePage.js
import { Container, Row, Col } from "react-bootstrap";
import { ParentProfileLeftSidebar } from "./leftSidebar/profileLeftSidebar";
import { ParentProfileSection } from "./profileSection";
import { CommonFooter } from "../../../components/common/footer/footer";
import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { useState } from "react";
import { ViewChild } from "../viewChild/viewChild";
import { ParentResetPassword } from "../resetPassword/resetPassword";
import { DisplayTodo } from "../displayTodo/displayTodo";
import { AddTodo } from "../addTodo/addTodo";
import { RegisterChild } from "../registerChild/registerChild";
import "./parentProfilePage.css";
import { DisplayVaccineBooking } from "../displayVaccineBooking/displayVaccineBooking";

export const ParentProfilePage = () => {
  const [activePage, setActivePage] = useState<string>("profile");
  const changeActivePage = (page: string) => {
    setActivePage(page);
  };
  return (
    <>
      <ParentNavbar />

      <Container fluid>
        <Row>
          <Col md={3} className="sidebar-container">
            <ParentProfileLeftSidebar changeActivePage={changeActivePage} />
          </Col>
          <Col md={9} className="profile-container">
            {activePage === "profile" && <ParentProfileSection />}
            {activePage === "add-todo" && <AddTodo />}
            {activePage === "vaccine-booking" && <DisplayVaccineBooking />}
            {activePage === "display-todo" && <DisplayTodo />}
            {activePage === "register-child" && <RegisterChild />}
            {activePage === "child" && <ViewChild />}
            {activePage === "reset-password" && <ParentResetPassword />}
          </Col>
        </Row>
      </Container>
      <CommonFooter />
    </>
  );
};
