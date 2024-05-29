import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

const FeaturedHealthTips = () => {
  const tips = [
    {
      title: "Stay Hydrated",
      description:
        "Drinking enough water is essential for maintaining good health. Aim for at least 8 glasses a day.",
    },
    {
      title: "Regular Exercise",
      description:
        "Incorporate at least 30 minutes of moderate exercise into your daily routine to stay fit and healthy.",
    },
    {
      title: "Balanced Diet",
      description:
        "Eat a balanced diet rich in fruits, vegetables, and lean proteins to provide your body with essential nutrients.",
    },
    {
      title: "Mental Health",
      description:
        "Take time to relax and unwind. Mental well-being is just as important as physical health.",
    },
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Featured Health Tips</h2>
      <Row>
        {tips.map((tip, index) => (
          <Col key={index} md={6} lg={3} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{tip.title}</Card.Title>
                <Card.Text>{tip.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeaturedHealthTips;
