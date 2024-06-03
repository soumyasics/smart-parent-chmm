// ProfilePage.js
import { Container, Row, Col } from "react-bootstrap";
import "./parentProfilePage.css";
import { ParentProfileLeftSidebar } from "./profileLeftSidebar";
import { ParentProfileSection } from "./profileSection";
import { CommonFooter } from "../../../components/common/footer/footer";
import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { useState } from "react";

export const ParentProfilePage = () => {
  const [activePage, setActivePage] = useState<string>("profile");
  const changeActivePage = (page: string) => {
    setActivePage(page);
  }
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
          </Col>
        </Row>
      </Container>
      <CommonFooter />
    </>
  );
};
