import React from "react";
import { Container, Image } from "react-bootstrap";
import "./itemsNotFound.css";
import notFoundImg1 from "../../../assets/not-found-1.jpg";
interface ItemsNotFoundProps {
  title?: string;
  description?: string;
}
export const ItemsNotFound: React.FC<ItemsNotFoundProps> = ({
  title = "",
  description = "  ",
}) => {
  return (
    <Container className="no-todo-container text-center">
      <Image src={notFoundImg1} alt="No Todo Items" className="no-todo-image mx-auto" />
      <h2 className="no-todo-text">{title}</h2>
      <p className="no-todo-subtext">{description}</p>
    </Container>
  );
};
