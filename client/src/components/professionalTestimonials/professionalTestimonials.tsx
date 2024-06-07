import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import userImg1 from "../../assets/test-user-1.jpg";
import userImg2 from "../../assets/test-user-2.jpg";
import userImg3 from "../../assets/test-user-3.jpg";
import userImg4 from "../../assets/test-user-4.jpg";

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Patient",
    testimonial:
      "The care I received was exceptional. The professionals were knowledgeable and compassionate.",
    image: userImg1, // Replace with actual image paths
  },
  {
    name: "Jane Smith",
    role: "Patient",
    testimonial:
      "I felt listened to and my health plan was tailored to my needs. Highly recommended!",
    image: userImg2,
  },
  {
    name: "John Doe",
    role: "Colleague",
    testimonial:
      "Working with this team has been a great experience. They are dedicated and professional.",
    image: userImg3,
  },
  {
    name: "Emily Wilson",
    role: "Patient",
    testimonial:
      "Their advice and support have been invaluable in improving my health.",
    image: userImg4,
  },
];

const ProfessionalTestimonials = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">What People Are Saying</h2>
      <Row>
        {testimonials.map((testimonial, index) => (
          <Col key={index} md={6} lg={3} className="mb-4">
            <Card className="h-100">
              <Card.Img
                className="rounded"
                style={{ height: "230px" }}
                variant="top"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <Card.Body>
                <Card.Title>{testimonial.name}</Card.Title>
                
                <Card.Text>"{testimonial.testimonial}"</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProfessionalTestimonials;
