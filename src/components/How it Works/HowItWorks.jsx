import axios from "axios";
import React, { useEffect, useState } from "react";

const HowItWorks = () => {
  const [howItWorks, sethowItWorks] = useState([]);
  useEffect(() => {
    const getHeader = async () => {
      try {
        const response = await axios.get("http://localhost:5000/how-it-works", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(response);
        const result = response.data;
        // console.log(result);
        sethowItWorks(result.result.reverse());
      } catch (error) {
        console.error("Error fetching header content:", error);
      }
    };

    getHeader();
  }, []);
  return (
    <div>
      <section id="how-it-works" class="how-it-works">
        <div class="container">
          <div class="how-it-works-black">
            <div class="row">
              <div class="col-md-8 col-xl-5  mx-auto">
                <h3>So, how does it work?</h3>
              </div>
            </div>
            <div class="row">
              {howItWorks.map((post, index) => (
                <div class="col-lg-4">
                  <div class="work-col">
                    <div class="circle mx-auto">{post.id}</div>
                    <p class="para">{post.description}</p>
                  </div>
                </div>
              ))}
              {/* <div class="col-lg-4">
                <div class="work-col">
                  <div class="circle mx-auto">2</div>
                  <p class="para">
                    Simply input some basic information or keywords about your
                    brand or product, and let our AI algorithms do the rest.
                  </p>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="work-col">
                  <div class="circle mx-auto">3</div>
                  <p class="para">
                    View, edit or export your result with a few clicks. And
                    you’re done!
                  </p>
                </div>
              </div> */}
              <div class="col-lg-12 mt-4 text-center">
                <p>Want to see? Join Magic</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
