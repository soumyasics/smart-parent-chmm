// ProfilePage.js
import { Container, Row, Col } from "react-bootstrap";
import { VCProfileLeftSidebar } from "./leftSidebar/profileLeftSidebar";
import { HPProfileSection } from "./profileSection/profileSection";
import { CommonFooter } from "../../../components/common/footer/footer";
import { useState } from "react";
import { HPResetPassword } from "../resetPassword/resetPassword";
import "./profilePage.css";
import { VCNavbar } from "../../../components/vc/vcNavbar/vcNavbar";
import { HPNavbar } from "../../../components/hp/hpNavbar/hpNavbar";

export const HPProfilePage = () => {
  const [activePage, setActivePage] = useState<string>("profile");
  const changeActivePage = (page: string) => {
    setActivePage(page);
  };
  return (
    <>
      <HPNavbar />
      <Container fluid>
        <Row>
          <Col md={3} className="sidebar-container">
            <VCProfileLeftSidebar changeActivePage={changeActivePage} />
          </Col>
          <Col md={9} className="profile-container">
            {activePage === "profile" && <HPProfileSection />}
            {activePage === "reset-password" && <HPResetPassword />}
          </Col>
        </Row>
      </Container>
      <CommonFooter />
    </>
  );
};
