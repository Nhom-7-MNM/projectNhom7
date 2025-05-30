import React from 'react';
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";

function Main() {
  return (
    
<>

    <section className="choseus-section spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title">
                      <br/>
                      <br/>
                        <h2>Phá vỡ giới hạn </h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-sm-6">
                    <div className="cs-item">
                        <span className="flaticon-034-stationary-bike"></span>
                        <h4>Modern equipment</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            dolore facilisis.</p>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <div className="cs-item">
                        <span className="flaticon-033-juice"></span>
                        <h4>Healthy nutrition plan</h4>
                        <p>Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel
                            facilisis.</p>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <div className="cs-item">
                        <span className="flaticon-002-dumbell"></span>
                        <h4>Proffesponal training plan</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            dolore facilisis.</p>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <div className="cs-item">
                        <span className="flaticon-014-heart-beat"></span>
                        <h4>Unique to your needs</h4>
                        <p>Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel
                            facilisis.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  
    <section className="classes-section spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title">
                        <span>Our classes</span>
                        <h2>WHAT WE CAN OFFER</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-6">
                    <div className="className-item">
                        <div className="ci-pic">
                            <img src="img/classes/class-1.jpg" alt=""/>
                        </div>
                        <div className="ci-text">
                            <span>STRENGTH</span>
                            <h5>Weightlifting</h5>
                            <a href="#"><i className="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="className-item">
                        <div className="ci-pic">
                            <img src="img/classes/class-2.jpg" alt=""/>
                        </div>
                        <div className="ci-text">
                            <span>Cardio</span>
                            <h5>Indoor cycling</h5>
                            <a href="#"><i className="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="className-item">
                        <div className="ci-pic">
                            <img src="img/classes/class-3.jpg" alt=""/>
                        </div>
                        <div className="ci-text">
                            <span>STRENGTH</span>
                            <h5>Kettlebell power</h5>
                            <a href="#"><i className="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <div className="className-item">
                        <div className="ci-pic">
                            <img src="img/classes/class-4.jpg" alt=""/>
                        </div>
                        <div className="ci-text">
                            <span>Cardio</span>
                            <h4>Indoor cycling</h4>
                            <a href="#"><i className="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="className-item">
                        <div className="ci-pic">
                            <img src="img/classes/class-5.jpg" alt=""/>
                        </div>
                        <div className="ci-text">
                            <span>Training</span>
                            <h4>Boxing</h4>
                            <a href="#"><i className="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section
  className="banner-section set-bg"
  style={{ backgroundImage: "url('/img/banner-bg.jpg')" }}
>


        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <div className="bs-text">
                        <h2>registration now to get more deals</h2>
                        <div className="bt-tips">Where health, beauty and fitness meet.</div>
                        <a href="#" className="primary-btn  btn-normal">Appointment</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
 
    <section className="pricing-section spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title">
                        <span>Our Plan</span>
                        <h2>Choose your pricing plan</h2>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-4 col-md-8">
                    <div className="ps-item">
                        <h3>className drop-in</h3>
                        <div className="pi-price">
                            <h2>$ 39.0</h2>
                            <span>SINGLE className</span>
                        </div>
                        <ul>
                            <li>Free riding</li>
                            <li>Unlimited equipments</li>
                            <li>Personal trainer</li>
                            <li>Weight losing classNamees</li>
                            <li>Month to mouth</li>
                            <li>No time restriction</li>
                        </ul>
                        <a href="#" className="primary-btn pricing-btn">Enroll now</a>
                        <a href="#" className="thumb-icon"><i className="fa fa-picture-o"></i></a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-8">
                    <div className="ps-item">
                        <h3>12 Month unlimited</h3>
                        <div className="pi-price">
                            <h2>$ 99.0</h2>
                            <span>SINGLE className</span>
                        </div>
                        <ul>
                            <li>Free riding</li>
                            <li>Unlimited equipments</li>
                            <li>Personal trainer</li>
                            <li>Weight losing classNamees</li>
                            <li>Month to mouth</li>
                            <li>No time restriction</li>
                        </ul>
                        <a href="#" className="primary-btn pricing-btn">Enroll now</a>
                        <a href="#" className="thumb-icon"><i className="fa fa-picture-o"></i></a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-8">
                    <div className="ps-item">
                        <h3>6 Month unlimited</h3>
                        <div className="pi-price">
                            <h2>$ 59.0</h2>
                            <span>SINGLE className</span>
                        </div>
                        <ul>
                            <li>Free riding</li>
                            <li>Unlimited equipments</li>
                            <li>Personal trainer</li>
                            <li>Weight losing classes</li>
                            <li>Month to mouth</li>
                            <li>No time restriction</li>
                        </ul>
                        <a href="#" className="primary-btn pricing-btn">Enroll now</a>
                        <a href="#" className="thumb-icon"><i className="fa fa-picture-o"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </section>
   

 
    <section className="team-section spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="team-title">
                        <div className="section-title">
                            <span>Our Team</span>
                            <h2>TRAIN WITH EXPERTS</h2>
                        </div>
                        <a href="#" className="primary-btn btn-normal appoinment-btn">appointment</a>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="ts-slider owl-carousel">
                    <div className="col-lg-4">
                    <div className="ts-item set-bg"style={{ backgroundImage: "url('/img/team/team-1.jpg')" }}>
                            <div className="ts_text">
                                <h4>Athart Rachel</h4>
                                <span>Gym Trainer</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                    
                    < div className="ts-item set-bg"style={{ backgroundImage: "url('/img/team/team-2.jpg')" }}>
                            <div className="ts_text">
                                <h4>Athart Rachel</h4>
                                <span>Gym Trainer</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                    < div className="ts-item set-bg"style={{ backgroundImage: "url('/img/team/team-3.jpg')" }}>
                            <div className="ts_text">
                                <h4>Athart Rachel</h4>
                                <span>Gym Trainer</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                    < div className="ts-item set-bg"style={{ backgroundImage: "url('/img/team/team-4.jpg')" }}>
                            <div className="ts_text">
                                <h4>Athart Rachel</h4>
                                <span>Gym Trainer</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                    < div className="ts-item set-bg"style={{ backgroundImage: "url('/img/team/team-5.jpg')" }}>
                            <div className="ts_text">
                                <h4>Athart Rachel</h4>
                                <span>Gym Trainer</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                    < div className="ts-item set-bg"style={{ backgroundImage: "url('/img/team/team-6.jpg')" }}>
                            <div className="ts_text">
                                <h4>Athart Rachel</h4>
                                <span>Gym Trainer</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
 
    <div className="gettouch-section">
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="gt-text">
                        <i className="fa fa-map-marker"></i>
                        <p>333 Middle Winchendon Rd, Rindge,<br/> NH 03461</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="gt-text">
                        <i className="fa fa-mobile"></i>
                        <ul>
                            <li>125-711-811</li>
                            <li>125-668-886</li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="gt-text email">
                        <i className="fa fa-envelope"></i>
                        <p>Support.gymcenter@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
 

                
                </>

    
  );
}

export default Main;
