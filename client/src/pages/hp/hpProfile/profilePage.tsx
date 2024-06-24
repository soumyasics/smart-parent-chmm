// ProfilePage.js
import { Container, Row, Col } from "react-bootstrap";
import { VCProfileLeftSidebar } from "./leftSidebar/profileLeftSidebar";
import { HPProfileSection } from "./profileSection/profileSection";
import { CommonFooter } from "../../../components/common/footer/footer";
import { useState } from "react";
import { HPResetPassword } from "../resetPassword/resetPassword";
import "./profilePage.css";
import { HPNavbar } from "../../../components/hp/hpNavbar/hpNavbar";
import { ViewTutroials } from "../../../components/hp/view-tutorials/viewTutorials";

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
            {activePage === "My-Tutorials" && <ViewTutroials />}
          </Col>
        </Row>
      </Container>
      <CommonFooter />
    </>
  );
};
