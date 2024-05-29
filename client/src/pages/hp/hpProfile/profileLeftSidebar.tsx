// LeftSidebar.js
import React from "react";
import { ListGroup } from "react-bootstrap";
import {
  FaUser,
  FaHeart,
  FaStar,
  FaCog,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";
import "./profileLeftSidebar.css";

export const ProfileLeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <h2 className="sidebar-title">Health Professional</h2>
      <ListGroup variant="flush">
        <ListGroup.Item className="sidebar-item">
          <FaUser className="sidebar-icon" /> My Profile
        </ListGroup.Item>
        <ListGroup.Item className="sidebar-item">
          <FaHeart className="sidebar-icon" /> Subscribers
        </ListGroup.Item>
        <ListGroup.Item className="sidebar-item">
          <FaStar className="sidebar-icon" /> My Content
        </ListGroup.Item>
        <ListGroup.Item className="sidebar-item">
          <FaCog className="sidebar-icon" /> Setting
        </ListGroup.Item>
        <ListGroup.Item className="sidebar-item">
          <FaBell className="sidebar-icon" /> Notifications
        </ListGroup.Item>
        <ListGroup.Item className="sidebar-item logout">
          <FaSignOutAlt className="sidebar-icon" /> Log out
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

