import React, { useState, useEffect } from "react";
import "../css/custom.css"; // Assuming you will move your CSS here

const FeaturesSection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}the-future-of-ai`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const result = await response.json();
      setPosts(result.transformedPosts);
    };
    fetchApi();
  }, []);

  const [tool, setTool] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/magic-tool");
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTool(data.result.reverse());
      } catch (error) {
        console.error("Error fetching magictool:", error);
      }
    };

    fetchData();
  }, []);
  // console.log(tool);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_KEY}ai-categories`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data.result.reverse());
      } catch (error) {
        console.error("Error fetching magictool:", error);
      }
    };

    fetchData();
  }, []);

  const [custometemplatedata, setCustometemplatedata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_KEY}custome-template`
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCustometemplatedata(data.result);
      } catch (error) {
        console.error("Error fetching custome_template:", error);
      }
    };

    fetchData();
  }, []);

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}roles`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const result = await response.json();
      setRoles(result.result.reverse());
    };
    fetchApi();
  }, []);
  return (
    <section id="features" className="features-sec">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 className="heading">The future of AI.</h2>
          </div>
        </div>

        <div className="row mt-5">
          {posts.map((post, index) => (
            <div className="col-md-6 col-lg-4">
              <div className="features-box">
                <div className="square-icon">
                  <img src={post.icon} alt="icon" />
                </div>
                <div>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="ai-tab-box">
          <div className="row">
            <div className="col-md-12">
              <div className="ai-tab-nav">
                <ul
                  className="nav nav-pills mb-3 "
                  id="pills-tab"
                  role="tablist"
                >
                  {categories.map((ele, index) => (
                    <li
                      className="nav-item text-wrap"
                      role="presentation"
                      style={{ width: "130px" }}
                    >
                      <button
                        className={`nav-link ${
                          index == 0 ? "active" : "active" + index
                        }`}
                        id="pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target={`#${index + "-btn"}`}
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
                <div className="tab-content" id="pills-tabContent">
                  {categories.map((ele, index) => (
                    <div
                      className={`tab-pane fade show  ${
                        index == 0 ? "active" : "active" + index
                      }`}
                      id={`${index + "-btn"}`}
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                      tabIndex={0}
                    >
                      {ele.acf.main_heading ? (
                        <div className="row">
                          <div className="col-md-6 pe-4">
                            <div className="tab-box">
                              <div>
                                <span className="btn-highlight">
                                  <span className="">
                                    {ele.acf.sub_heading_1}
                                  </span>
                                  {/* <span className="dot">
                                  <i className="fa-solid fa-circle" />
                                </span> */}
                                  {/* <span>AI</span> */}
                                </span>
                              </div>
                              <div className="bottom-text">
                                <h3 className="heading">
                                  {ele.acf.main_heading}
                                </h3>
                                <p
                                  className="mt-4"
                                  dangerouslySetInnerHTML={{
                                    __html: ele.acf.description,
                                  }}
                                ></p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 ps-md-4">
                            <div className="tab-box tab-box-right">
                              <div>
                                <img
                                  src={ele.imageUrl}
                                  className="img-fluid img-all"
                                  alt=""
                                />
                              </div>
                              <div className="text-center mt-4">
                                <h3 className="small-heading">
                                  {ele.acf.image_description}
                                </h3>
                                <p className="small-text">
                                  {ele.acf.powered_by}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <h3>{ele.title}</h3>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-md-5 py-md-5">
          {roles.map((ele, index) => (
            <div className="col-md-4 product">
              <div className="product-box">
                <div className="dots" />
                <div>
                  <h4>{ele.rolen_ame}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row my-5">
          <div className="col-md-12">
            <div className="custom-templates">
              <div className="row">
                <div className="col-md-12 text-center">
                  <div className="ct-btn">
                    <span className="btn-highlight">
                      <span>Custom</span>
                      <span className="dot">
                        <i className="fa-solid fa-circle" />
                      </span>
                      <span className="opt">Prompts</span>
                    </span>
                  </div>
                  <h3>Custom Templates.</h3>
                </div>
              </div>
              <div className="custom-tab-navbar">
                <ul className="nav">
                  <li className="nav-item">
                    <button
                      className="btn filter-button active"
                      data-filter="all"
                    >
                      All
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="btn filter-button" data-filter="Blog">
                      Blog
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn filter-button"
                      data-filter="Ecommerce"
                    >
                      Ecommerce
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn filter-button"
                      data-filter="Development"
                    >
                      Development
                    </button>
                  </li>
                </ul>
                <div className="row">
                  <div className="col-md-12">
                    <div className="custom-tab-content">
                      <div className="row">
                        {custometemplatedata.map((ele, index) => (
                          <div
                            className={`col-lg-4 filter ${ele.categories
                              .split(",")
                              .join(" ")}`}
                          >
                            <div className="custom-temp-service">
                              <div
                                className="icon-square"
                                dangerouslySetInnerHTML={{
                                  __html: ele.icons,
                                }}
                              ></div>
                              <h3 className="heading">{ele.title}</h3>
                              <p className="para">{ele.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-12">
            <div className="magic-tools">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h3>Magic tools.</h3>
                  <p className="col-md-6 mx-auto mt-3">
                    MagicAI has all the tools you need to create and manage your
                    SaaS platform.
                  </p>
                </div>
              </div>

              <div className="row mt-md-5">
                {tool.map((tools, index) => (
                  <div className="col-lg-4">
                    <div className="magic-tool-service">
                      <div>
                        <img
                          src={tools.imageUrl}
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                      <h3 className="heading">{tools.magic_titles}</h3>
                      <p className="para">{tools.magic_descriptions}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
