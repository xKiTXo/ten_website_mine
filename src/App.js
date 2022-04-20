import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./component/Header";
import Footer from "./component/Footer";

import Home from "./views/Home";
import About from "./views/About";
import Service from "./views/Service";
import Menu from "./views/Menu";
import Gallery from "./views/Gallery";
import Contact from "./views/Contact";

import { getStoreInfo } from "./controller/apiFunction";
import { updateInfo } from "./redux/actions";
import { useDispatch } from "react-redux";

import { Spinner,ProgressBar } from "react-bootstrap";



function App() {

  const dispatch = useDispatch();
  const [isLoad, setLoad] = useState(true)

  const getInformation = async () => {
    let results = await getStoreInfo()
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status < 300) {
          updateInfo(dispatch, res.data);
          setLoad(false)
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getInformation();
    // console.log(info);
  }, []);

  return (
    isLoad == false ?
      <div className="web">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/service" element={<Service />} />
          <Route exact path="/menu" element={<Menu />} />
          <Route exact path="/gallery" element={<Gallery />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div> :
      <div className="loading">
        <Spinner animation="border" role="status" variant="light"/>
      </div>

  )
}

export default App;
