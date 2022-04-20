import React, { useState, useEffect } from "react";

import { Row, Col, Nav } from "react-bootstrap";

import bg from "../imgs/contact/bg.png";
import MINE from "../imgs/MIne.png";

import { useDispatch } from "react-redux";
import { useStore } from "react-redux";

import { getStoreInfo } from "../controller/apiFunction";

import { updateInfo } from "../redux/actions";

function Contact() {
  const store = useStore();
  const dispatch = useDispatch();

  const [info, setInfo] = useState({});
  const [typeId, setTypeId] = useState(1);

  const getInformation = async () => {
    let results = await getStoreInfo()
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status < 300) {
          setInfo(res.data);
          updateInfo(dispatch, res.data);
          setTypeId(res.data.menuCategories[0].id);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (store.getState().shopInfo.info == null) {
      console.log('getInformation()')
      getInformation();
    } else {
      // console.log(store.getState().shopInfo.info);
      setInfo(store.getState().shopInfo.info);
    }
  }, []);
  return (
    <>
      <div
        className="bg"
        style={{ backgroundImage: `url(${bg})`, height: "100%" }}
      >
        <div className="contact_page">
          <div className="Contact">
            <div className="bg_div">
              <div className="text">
                <div className="title_div">
                  <div className="title">
                    CONTACT
                    <div className="title_line"></div>
                  </div>
                  <div className="contact_div">
                    {info.store != null ? (
                      <Row>
                        <Col lg={6} md={6} xs={12}>
                          <iframe
                            src={info.store.google_map}
                            style={{
                              border: 0,
                              filter:
                                "grayscale(95%) invert(92%) contrast(100%)",
                              height: "100%",
                              width: "100%",
                            }}
                            allowFullScreen=""
                            loading="lazy"
                          ></iframe>
                        </Col>
                        <Col lg={6} md={6} xs={12}>
                          <div className="info">
                            <div className="title">
                              {info.store.name}
                              <div className="title_line"></div>
                            </div>
                            <div className="context">
                              <p className="title">OUR CONTACT</p>
                              <img src={MINE} className="mine_img" />

                              <Row className="tel">
                                <Col
                                  lg={2}
                                  md={2}
                                  xs={12}
                                  className="contact_name"
                                >
                                  TEL:
                                </Col>
                                <Col
                                  lg={10}
                                  md={10}
                                  xs={12}
                                  className="contact_text"
                                >
                                  +852 {info.store.phone}
                                </Col>
                              </Row>
                              <Row className="address">
                                <Col
                                  lg={3}
                                  md={3}
                                  xs={12}
                                  className="contact_name"
                                >
                                  Address:
                                </Col>
                                <Col
                                  lg={9}
                                  md={9}
                                  xs={12}
                                  className="contact_text"
                                >
                                  {info.store.address}
                                </Col>
                              </Row>
                              <Row className="hours">
                                <Col
                                  lg={2}
                                  md={2}
                                  xs={12}
                                  className="contact_name"
                                >
                                  Hours:
                                </Col>
                                <Col
                                  lg={10}
                                  md={10}
                                  xs={12}
                                  className="contact_text"
                                >
                                  {info.store.working_hour}
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
