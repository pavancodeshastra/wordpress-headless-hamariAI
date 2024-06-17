import Faq from "./components/faq/faq";
import logo from "./components/images/logo.svg";
import "./components/css/custom.css";

import $ from "jquery";
// import "./App.css";
// import "./components/css/custom.css";
import HowItWorks from "./components/How it Works/HowItWorks";
import axios from "axios";
import { useEffect, useState } from "react";
import Testimonials from "./components/Testimonials/Testimonials";
import FeaturesSection from "./components/Features/Features";
import Pricing from "./components/Pricing/Pricing";
function App() {
  var wind = $(window);
  var sticky = $("#sticky-header");
  wind.on("scroll", function () {
    var scroll = wind.scrollTop();
    if (scroll < 100) {
      sticky.removeClass("sticky");
      sticky.removeClass("sticky");
    } else {
      sticky.addClass("sticky");
    }
  });
  const [headerData, setHeaderData] = useState([]);
  useEffect(() => {
    const getHeader = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/get-heared-content",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response);
        const result = response.data;
        // console.log();
        setHeaderData(result.result);
      } catch (error) {
        console.error("Error fetching header content:", error);
      }
    };

    getHeader();
  }, []);
  const [footerData, setfooterData] = useState([]);
  useEffect(() => {
    const getFooter = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/get-footer-content",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response);
        const result = response.data;
        // console.log();
        setfooterData(result.result);
      } catch (error) {
        console.error("Error fetching header content:", error);
      }
    };

    getFooter();
  }, []);
  return (
    <div>
      <header className="">
        <div className="top-line">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="top-text">
                  <span>Limited Offer</span> Sign up and receive 20% bonus
                  discount on checkout.
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav
          id="sticky-header"
          className="navbar navbar-expand-lg  mb-3 fixed-top my-navbar"
        >
          <div className="container">
            <a className="navbar-brand" href="#">
              <img src={logo} />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="nav navbar-nav nav-pills ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#home">
                    {headerData.nav_item_1}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#features">
                    {headerData.nav_item_2}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#how-it-works">
                    {headerData.nav_item_3}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#testimonials">
                    {headerData.nav_item_4}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#pricing">
                    {headerData.nav_item_5}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#faq">
                    {headerData.nav_item_6}
                  </a>
                </li>
                <li className="nav-item d-flex">
                  <a
                    className="nav-link btn-signIn px-4 ms-lg-3 ms-xl-5 me-4"
                    href="https://hamariai.codeshastra.dev/login"
                    target="blank"
                  >
                    {headerData.button_1}
                  </a>
                  <a
                    className="nav-link btn-joinHub px-4"
                    href="https://hamariai.codeshastra.dev/signup/"
                    target="blank"
                  >
                    {headerData.button_2}
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a
                    className="nav-link btn-joinHub px-4"
                    href="javascript:void()"
                  >
                    Join Hub
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
        <section id="home" className="banner-sec banner-bg">
          <div className="banner-divider">
            <svg
              className="fill-body-bg w-full h-auto"
              width="1440"
              height="105"
              viewbox="0 0 1440 105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveaspectratio="none"
            >
              <path d="M0 0C240 68.7147 480 103.072 720 103.072C960 103.072 1200 68.7147 1440 0V104.113H0V0Z"></path>
            </svg>
          </div>
          <div className="container position-relative ">
            <div className="row">
              <div className="col-md-12">
                <div className="">
                  <span className="btn-highlight">
                    <span className="text-white">
                      {headerData.sub_heading_1}
                    </span>
                    <span className="dot">
                      <i className="fa-solid fa-circle"></i>
                    </span>
                    <span>{headerData.sub_heading_2}</span>
                  </span>
                </div>
                <div className=" flex-row  ">
                  <h1 className=" w-50 m-auto">
                    {headerData.main_heading}
                    <span>
                      <i className="fa-solid fa-bolt"></i>
                    </span>
                  </h1>
                  <p className="para col-md-5 mx-auto">
                    {headerData.description}
                  </p>
                  <div>
                    <a href="#" className="btn btn-dark btn-black">
                      <span>
                        <i className="fa-solid fa-bolt"></i>
                      </span>{" "}
                      {headerData.making_money}
                    </a>
                  </div>
                  <div>
                    <a href="#" className="btn btn-a">
                      {headerData.discover_hamariai}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Faq />

      <footer className="footer">
        <div className="footer-gradiant"></div>
        <div className="footer-top">
          <svg
            className="w-full fill-body-bg"
            preserveaspectratio="none"
            width="1440"
            height="86"
            viewbox="0 0 1440 86"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 85.662C240 29.1253 480 0.857 720 0.857C960 0.857 1200 29.1253 1440 85.662V0H0V85.662Z"></path>
          </svg>
        </div>
        <div className="position-relative">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="footer-box">
                  <div className="ct-btn">
                    <span className="btn-highlight">
                      <span className="btn-highlight1">
                        {footerData.sub_heading_1}
                      </span>
                      <span className="opt"> {footerData.sub_heading_2}</span>
                    </span>
                  </div>
                  <h3 className="col-md-6 mx-auto">
                    {footerData.main_heading}
                  </h3>
                  <p className="col-md-6 col-xxl-5 mx-auto mt-3">
                    {footerData.description}
                  </p>
                  <a href="javascript:void()" className="btn btn-dark mt-4">
                    {footerData.community}
                    <span>
                      <i className="fa-solid fa-bolt"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="bottom-footer">
              <div className="row">
                <div className="col-md-12 text-center">
                  <p>{footerData.rights}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
