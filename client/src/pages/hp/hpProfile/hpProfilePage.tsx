// ProfilePage.js
import { Container, Row, Col } from "react-bootstrap";
import "./hpProfilePage.css";
import { ProfileLeftSidebar } from "./profileLeftSidebar";
import { ProfileSection } from "./profileSection";
import { HPNavbar } from "../../../components/hp/hpNavbar/hpNavbar";
import { CommonFooter } from "../../../components/common/footer/footer";

export const HPProfilePage = () => {
  return (
    <>
      <HPNavbar />

      <Container fluid>
        <Row>
          <Col md={3} className="sidebar-container">
            <ProfileLeftSidebar />
          </Col>
          <Col md={9} className="profile-container">
            <ProfileSection />
          </Col>
        </Row>
      </Container>
      <CommonFooter />
    </>
  );
};
