import React, { useEffect, useState } from "react";
import "../css/custom.css";
import "../css/bootstrap.css";
import "../css/all.css";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Faq = () => {
  $(document).ready(function () {
    $(".filter-button").click(function () {
      var value = $(this).attr("data-filter");

      if (value == "all") {
        //$('.filter').removeClass('hidden');
        $(".filter").show("1000");
      } else {
        //            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
        //            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
        $(".filter")
          .not("." + value)
          .hide("3000");
        $(".filter")
          .filter("." + value)
          .show("3000");
      }
      if ($(".filter-button").removeClass("active")) {
        $(this).removeClass("active");
      }
      $(this).addClass("active");
    });
  });

  const [faq, setFaq] = useState([]);
  useEffect(() => {
    const getHeader = async () => {
      try {
        const response = await axios.get("http://localhost:5000/faq", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(response);
        const result = response.data;
        // console.log(result);
        setFaq(result.result.reverse());
      } catch (error) {
        console.error("Error fetching header content:", error);
      }
    };

    getHeader();
  }, []);

  return (
    <div>
      <section id="faq" className="faq-sec">
        <div className="container">
          <div className="faq-box">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="ct-btn">
                  <span className="btn-highlight">
                    <span>FAQ</span>
                    <span className="dot">
                      <i className="fa-solid fa-circle" />
                    </span>
                    <span className="opt"> Help Center</span>
                  </span>
                </div>
                <h3>Have a question?</h3>
                <p className="col-md-6 mx-auto mt-3">
                  Our support team will get assistance from AI-powered
                  suggestions, making it quicker than ever to handle support
                  requests.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="faq-accordion">
                  <div className="accordion" id="accordionExample">
                    {faq.map((post, index) => (
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${`collapse` + index}`}
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            {post.question}
                          </button>
                        </h2>
                        <div
                          id={`${`collapse` + index}`}
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">{post.answer}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
