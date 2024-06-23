import { Card, Button } from "react-bootstrap";
import { FC } from "react";
import "./stepCard.css";

interface StepCardProps {
  imgPath: string;
  header: string;
  title: string;
  footer: string;
}

export const StepCard: FC<StepCardProps> = ({
  imgPath,
  header,
  title,
  footer,
}) => {
  return (
    <Card className="step-card text-center">
      <Card.Header className="step-card-header">{header}</Card.Header>
      <Card.Body >
        <div className="step-card-image d-flex justify-content-center">
          {/* Replace with an actual image tag if you have the image file */}
          <img src={imgPath} alt="Step Illustration" />
        </div>
        <Card.Text className="step-card-text">{title}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <p className="step-card-footer-text">
          {footer}
        </p>
      </Card.Footer>
    </Card>
  );
};
