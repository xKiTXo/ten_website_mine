import React from 'react'

import { Row, Col, } from 'react-bootstrap';


import bg from '../imgs/service/service_bg.png';
import left from '../imgs/service/service_left.png';
import right from '../imgs/service/service_right.png';

function Service() {
    return (
        <div className="service_page">
            <div className="Service">
                <div className="bg" style={{ backgroundImage: `url(${bg})`, height: '100%' }}>
                    <div className="bg_div">
                        <div className="text">
                            <div className="title_div">
                                <div className="title">
                                    OUR SERVICE
                                    <div className="title_line"></div>
                                </div>
                                <div className="ourService">
                                    <Row>
                                        <Col md={6} sm={12} className="img_div">
                                            <img src={left} />
                                        </Col>
                                        <Col md={6} sm={12} className="img_div">
                                            <img src={right} />
                                        </Col>
                                    </Row>
                                </div>
                                <p className="contact">For private events please call: <span style={{fontWeight:'bold'}}>+852 1234 5678</span> </p>
                            </div>



                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service
