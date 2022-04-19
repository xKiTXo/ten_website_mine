import React, { useState, useEffect } from "react";

import Navbar from "react-bootstrap/Navbar";
import { Container, Nav, Row, Col } from "react-bootstrap";

import Mine from "../imgs/MIne.png";
import ig from "../imgs/instagram_icn.png";
import facebook from "../imgs/coolicon.png";

import { Link } from "react-router-dom";

import { useStore, useDispatch } from "react-redux";

import { getStoreInfo } from "../controller/apiFunction";
import { updateInfo } from "../redux/actions";

export function Footer() {
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
      console.log(store.getState().shopInfo.info);
      setInfo(store.getState().shopInfo.info);
    }
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="footer">
      <div className="content">
        <Row className="top_menu">
          <Col md={4}>
            <img src={Mine} />
          </Col>
          <Col md={8}>
            <ul className="top_ul">
              <li>
                <Nav.Item>
                  <Link
                    className="nav_a_link"
                    to="/about"
                    onClick={() => handleClick()}
                  >
                    {" "}
                    ABOUT
                  </Link>
                </Nav.Item>
              </li>
              <li>
                <Nav.Item>
                  {" "}
                  <Link
                    className="nav_a_link"
                    to="/service"
                    onClick={() => handleClick()}
                  >
                    SERVICE
                  </Link>
                </Nav.Item>
              </li>
              <li>
                <Nav.Item>
                  {" "}
                  <Link
                    className="nav_a_link"
                    to="/menu"
                    onClick={() => handleClick()}
                  >
                    MENU
                  </Link>
                </Nav.Item>
              </li>
              <li>
                <Nav.Item>
                  {" "}
                  <Link
                    className="nav_a_link"
                    to="/gallery"
                    onClick={() => handleClick()}
                  >
                    GALLERY
                  </Link>
                </Nav.Item>
              </li>
              <li>
                <Nav.Item>
                  {" "}
                  <Link
                    className="nav_a_link"
                    to="/contact"
                    onClick={() => handleClick()}
                  >
                    CONTACT
                  </Link>
                </Nav.Item>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="bottom_menu">
          <Col lg={4} md={3} sm={12} xs={12} className="description">
            Zinc Group HK is always pushing boundaries and expanding across Hong
            Kong and beyond.
            <br />
            <p>© Zinc Group all rights reserved</p>
          </Col>
          <Col lg={8} md={9} sm={12} xs={12} className="menu">
            <Row>
              <Col lg={4} md={6} sm={12} xs={12} className="ourVenues">
                <h4>Our Venues</h4>
                <Row>
                  {info.venues != null
                    ? info.venues.map((item, index) => {
                        return (
                          <Col md={6} xs={6} key={index+item}>
                            <a href={item.website}>{item.name}</a>
                          </Col>
                        );
                      })
                    : null}
                </Row>
              </Col>
              <Col lg={4} md={0} sm={12} xs={12} className="HeadOffice">
                <h4>Head Office</h4>

                <Col md={12}>
                  {info.store != null ? info.store.address : null}
                </Col>
                <Col md={12}>
                  T: (852) {info.store != null ? info.store.phone : null}
                </Col>
                <Col md={12}>
                  E: {info.store != null ? info.store.email : null}
                </Col>
              </Col>
              <Col lg={4} md={5} sm={12} xs={12} className="StayInTouch">
                <h4>Stay In Touch</h4>

                {/* <Col md={12}>Join Us</Col>
                <Col md={12}>Subscribe</Col> */}
                <Col md={12} xs={12}>
                  {info.store != null ? (
                    <a href={info.store.ig_link}>
                      <img src={ig} style={{ marginRight: "7%" }} />
                    </a>
                  ) : null}

                  {info.store != null ? (
                    <a href={info.store.facebook_link}>
                      <img src={facebook} />
                    </a>
                  ) : null}
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;
