import React, { useEffect, useState } from "react";

import bg from "../imgs/home/bg.png";
import { Row, Col } from "react-bootstrap";
import Slider from "react-slick";

import whatsapp from "../imgs/home/WhatsApp.png";
import fb_msg from "../imgs/home/fb_msg.png";
import service_l from "../imgs/home/service_left.png";
import service_r from "../imgs/home/service_right.png";
import service_bg from "../imgs/home/service_bg.png";

import Rectangle1 from "../imgs/home/Rectangle1.png";
import Rectangle2 from "../imgs/home/Rectangle2.png";
import Rectangle3 from "../imgs/home/Rectangle3.png";
import Rectangle4 from "../imgs/home/Rectangle4.png";

import { useDispatch, useStore } from "react-redux";

import { getStoreInfo } from "../controller/apiFunction";
import { updateInfo } from "../redux/actions";

import { Link } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Home() {
  const img_slick_settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: false,
  };

  const banner_slick_settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",

    arrows: false
  }

  const dispatch = useDispatch();
  const store = useStore();

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
      //console.log(store.getState().shopInfo.info);
      setInfo(store.getState().shopInfo.info);
    }
  }, []);

  const [showBtns, setShowBtns] = useState(false);




  return (
    <div className="home_page">
      {info.store != null ?
      
         

          <div className="btns">
            <a href={"https://wa.me/" + info.store.phone}>
              <img className="social_btn" src={whatsapp} />
              <h6>whatsapp</h6>
            </a>
            <a href={"http://m.me/" + info.store.facebook_link.split('https://www.facebook.com/')[1]}>
              <img className="social_btn" src={fb_msg} />
              <h6>Facebook</h6>
            </a>
          </div>
    


        : null}

      <div className="Home" >
        {info.banners != null ? (
          <Carousel
            showArrows={false}
            emulateTouch={true}
            autoPlay={true}
            infiniteLoop={true}
            interval={5000}
            transitionTime={1000}
            showThumbs={false}
          >
            {info.banners.map((item, index) => {
              return (
                <div
                  className="bg"
                  key={item + index}
                  style={{
                    backgroundImage: `url(${info.image_base_url + item.banner_image_path
                      })`,
                    height: "100%",
                  }}
                >
                  <div className="bg_div">
                    <div className="text">
                      <p className="context">{item.banner_subtitle1}</p>
                      <div className="title_div">
                        <div className="title">
                          {item.banner_main_title}
                          <div className="title_line"></div>
                        </div>
                      </div>
                      <p className="time">{item.banner_subtitle2}</p>

                    </div>
                  </div>
                </div>

              )
            })}
          </Carousel>
        ) : null}
      </div>
      <div className="about">
        <div className="title_div">
          <div className="title">
            ABOUT US
            <div className="title_line"></div>
          </div>
        </div>
        <p>
          For your next restaurant & bar prospect in a prime Central Hong Kong
          location, uncover Mine. Discover the intrigue of unwinding in an
          underground setting without descending, as you soak in the
          surroundings that hark back to a bygone era.
        </p>
        <p>
          Carefully curated from top to toe, every detail of Mine is designed to
          take you to another dimension. From the rustic décor to vintage
          memorabilia lining the walls, our conceptual bar and restaurant gives
          patrons an experiential space to revel and recline.
        </p>
      </div>
      <div
        className="ourService"
        style={{ backgroundImage: `url(${service_bg})` }}
      >
        <div className="title">OUR SERVICE</div>
        <Row>
          <Col md={6} sm={12} className="img_div">
            <img src={service_l} />
          </Col>
          <Col md={6} sm={12} className="img_div">
            <img src={service_r} />
          </Col>
        </Row>
      </div>
      <div className="menu">
        <div className="text">
          <div className="title_div">
            <div className="title">
              DELICIOUS MENU
              <div className="title_line"></div>
            </div>
          </div>
          <p>
            For your next restaurant & bar prospect in a prime Central Hong Kong
            location, we provide different dining food and cocktails.
          </p>
        </div>
        <div className="options">
          <Row lg={12}>
            {info.menus != null
              ? info.menuCategories.map((item, index) => {
                return (
                  <Col lg={2} md={4} xs={4} className="item" key={index + item}>
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
                    <Col lg={4} md={6} xs={12} className="item" key={index + item}>
                      <div style={{ color: "#BDBDBD" }}>
                        <div className="context">
                          <h6 className="name">{item.menu_title}</h6>
                          <h6 className="price">HKD${item.price}</h6>
                        </div>
                        <h6 className="description">{item.menu_content}</h6>
                      </div>
                    </Col>
                  );
                }
              })
              : null}
          </Row>
        </div>
      </div>
      <div className="slick2">
        <Slider {...img_slick_settings}>
          {info.galleries != null
            ? info.galleries.map((item, index) => {
              return (
                <div className="img_div" key={index + item}>
                  <img
                    src={info.image_base_url + item.image}
                    alt={item.gallery_content}
                  />
                </div>
              );
            })
            : null}
        </Slider>
      </div>
    </div>
  );
}

export default Home;
