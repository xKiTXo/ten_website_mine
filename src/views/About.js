import React, { useState, useEffect } from "react";

import bg from "../imgs/about/bg.png";

import { useDispatch, useStore } from "react-redux";
import { getStoreInfo } from "../controller/apiFunction";
import { updateInfo } from "../redux/actions";


function About() {
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

      console.log('getInformation()')
      getInformation();
    } else {
      // console.log(store.getState().shopInfo.info);
      setInfo(store.getState().shopInfo.info);
    }
  }, []);

  return (
    <div className="about_page">
      <div className="About">
        <div
          className="bg"
          style={{ backgroundImage: `url(${bg})`, height: "100%" }}
        >
          <div className="bg_div">
            <div className="text">
              <div className="title_div">
                <div className="title">
                  ABOUT US
                  <div className="title_line"></div>
                </div>
              </div>
              <p className="description">
                {info.store!=null?
                info.store.about_text
                :null}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
