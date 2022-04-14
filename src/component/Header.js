import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav, Row, Col } from "react-bootstrap";

import logo from "../imgs/MIne.png";
import logo_white from "../imgs/logo_white.png";

import { Routes, Route, Link } from "react-router-dom";

function Header() {
  return (
    <Navbar expand="lg" variant="dark" className="header">
      <Container>
        <div className="mobile">
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="mobile_left"
          />

          <Nav className="mobile_center_logo">
            <Nav.Item className="nav_a_link">
              <Link to="/">
                <img src={logo_white} />
              </Link>
            </Nav.Item>
          </Nav>
        </div>
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="mobile_left_logo"
        >
          <Nav>
            <Nav.Item className="nav_a_link">
              <Link to="/">
                <img src={logo} width="80" height="32" />
              </Link>
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Item className="nav_a_link">
              <Link to="/about">ABOUT</Link>
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Item className="nav_a_link">
              <Link to="/service">SERVICE</Link>
            </Nav.Item>
          </Nav>

          <Nav className="mobileShow">
            <Nav.Item className="nav_a_link">
              <Link to="#">
                <img src={logo_white} width="156" height="156" />
              </Link>
            </Nav.Item>
          </Nav>

          <Nav>
            <Nav.Item className="nav_a_link">
              <Link to="/menu"> MENU</Link>
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Item className="nav_a_link">
              <Link to="/gallery">GALLERY</Link>
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Item className="nav_a_link">
              <Link to="/contact">CONTACT</Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
