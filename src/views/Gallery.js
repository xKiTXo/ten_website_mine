import React, { useState, useEffect } from "react";

import { Row, Col, Nav } from "react-bootstrap";
import { useStore, useDispatch } from "react-redux";
import bg from "../imgs/gallery/bg.png";

import { getStoreInfo } from "../controller/apiFunction";
import { updateInfo } from "../redux/actions";
function Gallery() {
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
      getInformation();
    } else {
      console.log(store.getState().shopInfo.info);
      setInfo(store.getState().shopInfo.info);
    }
  }, []);

  return (
    <>
      <div
        className="bg"
        style={{ backgroundImage: `url(${bg})`, height: "100%" }}
      >
        <div className="gallery_page">
          <div className="Gallery">
            <div className="bg_div">
              <div className="text">
                <div className="title_div">
                  <div className="title">
                    OUR GALLERY
                    <div className="title_line"></div>
                  </div>
                  <div className="list_div">
                    <Row>
                      {info.galleries != null
                        ? info.galleries.map((item, index) => {
                            return (
                              <Col lg={3} md={3} xs={12} className="item">
                                <img
                                  src={info.image_base_url + item.image}
                                  alt={item.gallery_content}
                                  style={{ height: "100%", width: "100%" }}
                                />
                              </Col>
                            );
                          })
                        : null}
                    </Row>
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

export default Gallery;
