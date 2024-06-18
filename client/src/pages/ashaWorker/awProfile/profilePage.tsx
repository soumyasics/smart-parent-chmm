// ProfilePage.js
import { Container, Row, Col } from "react-bootstrap";
import { AWProfileLeftSidebar } from "./leftSidebar/profileLeftSidebar";
import { AWProfileSection } from "./profileSection/profileSection";
import { CommonFooter } from "../../../components/common/footer/footer";
import { useState } from "react";
import { AWResetPassword } from "../resetPassword/resetPassword";
import "./profilePage.css";
import { AWNavbar } from "../../../components/aw/awNavbar/awNavbar";

export const AWProfilePage = () => {
  const [activePage, setActivePage] = useState<string>("profile");
  const changeActivePage = (page: string) => {
    setActivePage(page);
  };
  return (
    <>
      <AWNavbar/>
      <Container fluid>
        <Row>
          <Col md={3} className="sidebar-container">
            <AWProfileLeftSidebar changeActivePage={changeActivePage} />
          </Col>
          <Col md={9} className="profile-container">
            {activePage === "profile" && <AWProfileSection />}
            {activePage === "reset-password" && <AWResetPassword />}
          </Col>
        </Row>
      </Container>
      <CommonFooter />
    </>
  );
};
