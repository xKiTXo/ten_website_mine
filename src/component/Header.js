import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav, Row, Col, Offcanvas, NavDropdown, Form, FormControl, Button, CloseButton } from "react-bootstrap";

import logo from "../imgs/MIne.png";
import logo_white from "../imgs/logo_white.png";

import { Routes, Route, Link } from "react-router-dom";

import { useStore ,useDispatch} from "react-redux";
import { getStoreInfo } from "../controller/apiFunction";
import { updateInfo } from "../redux/actions";
function Header() {
  const [showNav, setShowNav] = useState(false)

  const store = useStore();
  const [info, setInfo] = useState({});
  const dispatch = useDispatch();

  const getInformation = async () => {
    let results = await getStoreInfo()
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status < 300) {
          setInfo(res.data);
          updateInfo(dispatch, res.data);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (store.getState().shopInfo.info == null) {
      getInformation();
    } else {
      // console.log(store.getState().shopInfo.info);
      setInfo(store.getState().shopInfo.info);
    }
  }, []);
  return (
    <Navbar expand="lg" variant="dark" className="header " >
      <Container>
        <div className="mobile">
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="mobile_left"
            onClick={() => setShowNav(true)}
          />

          <Nav className="mobile_center_logo">
            <Nav.Item className="nav_a_link">
              <a href="https://zincgp.uniconsults.com/">
                <img src={logo_white} />
              </a>
            </Nav.Item>
          </Nav>
        </div>
        <Navbar.Offcanvas
          id="responsive-navbar-nav"
          className="mobile_left_logo"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          show={showNav}
          onHide={() => setShowNav(false)}
        >
          <Offcanvas.Header >
            <CloseButton variant='white' onClick={() => setShowNav(false)} />
            <Offcanvas.Title id="offcanvasNavbarLabel" style={{ width: '100%', textAlign: 'center' }}>
              <a href="https://zincgp.uniconsults.com/" onClick={() => setShowNav(false)}>
                <img src={logo_white} width="80" />
              </a>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>
              <Nav.Item className="nav_a_link">
                <Link to="/" onClick={() => setShowNav(false)}>
                {info.store != null ? (
                  <img src={info.image_base_url + info.store.icon_image_path} height="32" />
                ) : null}
                </Link>
              </Nav.Item>
            </Nav>
            <Nav>
              <Nav.Item className="nav_a_link">
                <Link to="/about" onClick={() => setShowNav(false)}>ABOUT</Link>
              </Nav.Item>
            </Nav>
            <Nav>
              <Nav.Item className="nav_a_link">
                <Link to="/service" onClick={() => setShowNav(false)}>SERVICE</Link>
              </Nav.Item>
            </Nav>
            <Nav>
              <Nav.Item className="nav_a_link">
                <Link to="/menu" onClick={() => setShowNav(false)}> MENU</Link>
              </Nav.Item>
            </Nav>
            <Nav>
              <Nav.Item className="nav_a_link">
                <Link to="/gallery" onClick={() => setShowNav(false)}>GALLERY</Link>
              </Nav.Item>
            </Nav>
            <Nav>
              <Nav.Item className="nav_a_link">
                <Link to="/contact" onClick={() => setShowNav(false)}>CONTACT</Link>
              </Nav.Item>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="mobile_left_logo desktop"
        >
          <Nav>
            <Nav.Item className="nav_a_link">
              <Link to="/">
                {info.store != null ? (
                  <img src={info.image_base_url + info.store.icon_image_path}  height="32" />
                ) : null}

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
              <a href='https://zincgp.uniconsults.com/' >
                <img src={logo_white} width="156" height="156" />
              </a>
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
