import React, { useEffect, useState } from "react";

import { Row, Col } from "react-bootstrap";
import { useStore, useDispatch } from "react-redux";
import Slider from "react-slick";
import bg from "../imgs/menu/bg.png";

import { getStoreInfo } from "../controller/apiFunction";
import { updateInfo } from "../redux/actions";
import { Link } from "react-router-dom";

function Menu() {
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

  const handleMenuType = (type) => {
    // console.log(type);
    setTypeId(type);
  };

  useEffect(() => {
    if (store.getState().shopInfo.info == null) {
      getInformation();
    } else {
      console.log(store.getState().shopInfo.info);
      setInfo(store.getState().shopInfo.info);
      setTypeId(store.getState().shopInfo.info.menuCategories[0].id);
    }
  }, []);

  return (
    <div className="menu_page">
      <div className="Menu">
        <div
          className="bg"
          style={{ backgroundImage: `url(${bg})`, height: "100%" }}
        >
          <div className="bg_div">
            <div className="text">
              <div className="title_div">
                <div className="title">
                  DELICIOUS MENU
                  <div className="title_line"></div>
                </div>
              </div>
              <p className="menu_description">
                For your next restaurant & bar prospect in a prime Central Hong
                Kong location, we provide different dining food and cocktails.
              </p>

              <div className="options">
                <Row lg={12}>
                  {info.menus != null
                    ? info.menuCategories.map((item, index) => {
                        return (
                          <Col lg={2} md={4} xs={4} className="item" key={index+item}>
                            <Link
                              to="#"
                              className={typeId == item.id ? "active" : null}
                              onClick={() => handleMenuType(item.id)}
                            >
                              {item.name}
                            </Link>
                          </Col>
                        );
                      })
                    : null}
                </Row>
              </div>

              <div className="menu_items">
                <Row lg={10} md={10} xs={12}>
                  {info.menus != null
                    ? info.menus.map((item, index) => {
                        if (item.menu_category_id == typeId) {
                          return (
                            <Col lg={4} md={6} xs={12} className="item"  key={index+item}>
                              <div style={{ color: "#BDBDBD" }}>
                                <div className="context">
                                  <h6 className="name">{item.menu_title}</h6>
                                  <h6 className="price">HKD${item.price}</h6>
                                </div>
                                <h6 className="description">
                                  {item.menu_content}
                                </h6>
                              </div>
                            </Col>
                          );
                        }
                      })
                    : null}
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
