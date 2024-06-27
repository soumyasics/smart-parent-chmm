// ProfilePage.js
import { Container, Row, Col } from "react-bootstrap";
import { VCProfileLeftSidebar } from "./leftSidebar/profileLeftSidebar";
import { VCProfileSection } from "./profileSection/profileSection";
import { CommonFooter } from "../../../components/common/footer/footer";
import { useState } from "react";
import { VCResetPassword } from "../resetPassword/resetPassword";
import "./profilePage.css";
import { VCNavbar } from "../../../components/vc/vcNavbar/vcNavbar";
import { ViewVaccines } from "../viewVaccines.tsx/viewVaccines";
import { ViewVaccineDetails } from "../viewVaccineDetails/viewVaccineDetails";

export const VCProfilePage = () => {
  const [activePage, setActivePage] = useState<string>("view-vaccines");
  const [vaccineId, setVaccineId] = useState<string>("");
  const changeActivePage = (page: string) => {
    setActivePage(page);
  };

  const showVaccineDetailsPage = (id: string) => {
    setActivePage("view-vaccine-details");
    setVaccineId(id);
  };

  const showVaccinesPage = () => {
    setActivePage("view-vaccines");
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
            {activePage === "view-vaccines" && (
              <ViewVaccines showVaccineDetailsPage={showVaccineDetailsPage} />
            )}
            {activePage === "view-vaccine-details" && (
              <ViewVaccineDetails
                vaccineId={vaccineId}
                showVaccinesPage={showVaccinesPage}
              />
            )}
          </Col>
        </Row>
      </Container>
      <CommonFooter />
    </>
  );
};
