// ProfilePage.js
import { Container, Row, Col } from "react-bootstrap";
import { VCProfileLeftSidebar } from "./leftSidebar/profileLeftSidebar";
import { VCProfileSection } from "./profileSection/profileSection";
import { CommonFooter } from "../../../components/common/footer/footer";
import { useState } from "react";
import { VCResetPassword } from "../resetPassword/resetPassword";
import "./profilePage.css";
import { VCNavbar } from "../../../components/vc/vcNavbar/vcNavbar";

export const VCProfilePage = () => {
  const [activePage, setActivePage] = useState<string>("profile");
  const changeActivePage = (page: string) => {
    setActivePage(page);
  };
  return (
    <>
      <VCNavbar />

      <Container fluid>
        <Row>
          <Col md={3} className="sidebar-container">
            <VCProfileLeftSidebar changeActivePage={changeActivePage} />
          </Col>
          <Col md={9} className="profile-container">
            {activePage === "profile" && <VCProfileSection />}
            {activePage === "reset-password" && <VCResetPassword />}
          </Col>
        </Row>
      </Container>
      <CommonFooter />
    </>
  );
};
