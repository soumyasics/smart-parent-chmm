import { Row, Col, Container } from "react-bootstrap";
import "./adminFooter.css";
export const AdminFooter = () => {
  return (
    <Container fluid className="admin-footer">
      <Row>
        <Col>
          <p> Copyright © 2024</p>
          <p>All rights reserved by Child Crescendo</p>
        </Col>
      </Row>
    </Container>
  );
};

