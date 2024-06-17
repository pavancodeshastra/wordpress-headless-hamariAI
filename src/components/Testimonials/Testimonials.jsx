import React, { useEffect, useState } from "react";
import "../css/custom.css";
import "../css/bootstrap.css";
import "../css/all.css";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./testimonial.css";
import Carousel from "react-bootstrap/Carousel";
import avatar_1 from "../images/testimonial/202306020840avatar-1.jpg";
import avatar_2 from "../images/testimonial/202306020840avatar-2.jpg";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    const getHeader = async () => {
      try {
        const response = await axios.get("http://localhost:5000/testimonials", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(response);
        const result = response.data;
        // console.log(result);
        setTestimonials(result.result.reverse());
      } catch (error) {
        console.error("Error fetching header content:", error);
      }
    };

    getHeader();
  }, []);

  return (
    <section id="testimonials" className="testimonials-sec">
      <div className="container">
        <div className="testimonials-box">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="ct-btn">
                <span className="btn-highlight">
                  <span>Testimonials</span>
                  <span className="dot">
                    <i className="fa-solid fa-circle"></i>
                  </span>
                  <span className="opt">Trustpilot</span>
                </span>
              </div>
              <h3>Trusted by millions.</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-8 mx-auto">
              <Carousel>
                {testimonials.map((post, ele) => (
                  <Carousel.Item>
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src={post.imageUrl}
                        alt="Eric Sanchez"
                        className="profile-image"
                        style={{ width: "100px", height: "auto" }}
                      />
                      <div className="testimonial-content text-center">
                        <h4>{post.name}</h4>
                        <small>{post.designation}</small>
                        <p>{post.content}</p>
                      </div>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
              <div className="carousel-indicators-wrapper mt-3">
                {/* <ol className="carousel-indicators">
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="0"
                    className="active"
                  ></li>
                </ol> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
