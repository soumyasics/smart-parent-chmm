import React, { useState, useEffect } from "react";
import logo from "../Assets/logo.png";
import "./Navitem.css";
import { useNavigate } from "react-router-dom";
import "./Logo.css";

export function ParentNavbar() {
  return (
    <nav
      id="common-home-navbar"
      className="navbar navbar-expand-lg bg-body-tertiary pe-5"
    >
      <div className="container-fluid text-white">
        <img
          style={{ cursor: "pointer" }}
          src={logo}
          alt="Logo"
          width="60"
          height="60"
          className="d-inline-block align-text-top"
          id="logo"
        />
        &nbsp;&nbsp;
        <b style={{ cursor: "pointer" }}>SmartParent</b>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav a1 gap-4" style={{ marginRight: "60px" }}>
            <li style={{ cursor: "pointer" }} className="nav-item">
              <a className="nav-link active text-white" aria-current="page">
                Home
              </a>
            </li>
            <li style={{ cursor: "pointer" }} className="nav-item">
              <a className="nav-link active text-white" aria-current="page">
                Resource Person
              </a>
            </li>
            <li className="nav-item" style={{ cursor: "pointer" }}>
              <a className="nav-link active text-white" href="#" id="a3">
                Subscriptions
              </a>
            </li>
            <li style={{ cursor: "pointer" }} className="nav-item">
              <a className="nav-link active text-white" aria-current="page">
                Councilors
              </a>
            </li>
            <li style={{ cursor: "pointer" }} className="nav-item">
              <a className="nav-link active text-white" aria-current="page">
                Chat
              </a>
            </li>
            <li style={{ cursor: "pointer" }} className="nav-item">
              <a className="nav-link active text-white" aria-current="page">
                view Answers
              </a>
            </li>
            <li style={{ cursor: "pointer" }} className="nav-item">
              <a className="nav-link active text-white" aria-current="page">
                Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

