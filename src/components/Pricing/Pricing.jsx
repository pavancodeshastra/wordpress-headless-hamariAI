import React, { useEffect, useState } from "react";

const Pricing = () => {
  const [pricing, setPricing] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}get-pricing`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const result = await response.json();
      setPricing(result.transformedPosts);
    };
    fetchApi();
  }, []);
  return (
    <div>
      <section id="pricing" class="pricing-sec">
        <div class="container">
          <div class="pricing-box">
            <div class="row">
              <div class="col-md-12 text-center">
                <h3>Flexible Pricing.</h3>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="pricing-tab">
                  <ul
                    class="nav nav-pills mb-3 mx-auto"
                    id="pills-tab"
                    role="tablist"
                  >
                    {pricing.map((ele, index) => (
                      <li class="nav-item" role="presentation">
                        <button
                          class={`nav-link ${
                            index == 0 ? "active" : "active" + index
                          }`}
                          id="pills-home-tab"
                          data-bs-toggle="pill"
                          data-bs-target={`#pricing-tab-${index}`}
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          {ele.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div class="tab-content" id="pills-tabContent">
                    {pricing.map((ele, index) => (
                      <div
                        class={`tab-pane fade show ${
                          index == 0 ? "active" : "active" + index
                        }`}
                        id={`pricing-tab-${index}`}
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                        tabindex="0"
                      >
                        <div class="row">
                          <div class="col-md-12 d-flex justify-content-center">
                            <div class="safe-payment">
                              <div class="safe-icon">
                                <i class="fa-solid fa-unlock"></i>
                              </div>
                              <div>
                                <div class="safe-text">
                                  <strong>{ele.message}</strong>
                                </div>
                                <div class="safe-text">{ele.cards}</div>
                              </div>
                            </div>
                          </div>
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

export default Pricing;
