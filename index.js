const axios = require("axios");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Sample endpoint
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const getImageUrl = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error(
        "Response status:",
        response.status,
        "Status Text:",
        response.statusText
      );
    }

    const data = await response.json();

    return data.guid.rendered;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    throw error; // Rethrow the error to handle it outside
  }
};

app.get("/get-heared-content", async (req, res) => {
  const response = await axios.get(
    `${process.env.WORDPRESS_API}header_content`,
    {
      headers: {
        "conatent-type": "appication/json",
      },
    }
  );
  const result = response.data;
  res.status(200).send({ result: result[0].acf });
});

app.get("/how-it-works", async (req, res) => {
  const response = await axios.get(`${process.env.WORDPRESS_API}how-it-works`, {
    headers: {
      "conatent-type": "appication/json",
    },
  });
  const result = response.data;
  const data = result.map((item) => item.acf);
  res.status(200).send({ result: data });
});

app.get("/faq", async (req, res) => {
  const response = await axios.get(`${process.env.WORDPRESS_API}faq`, {
    headers: {
      "conatent-type": "appication/json",
    },
  });
  const result = response.data;
  const data = result.map((item) => item.acf);
  res.status(200).send({ result: data });
});

app.get("/testimonials", async (req, res) => {
  try {
    const response = await fetch(`${process.env.WORDPRESS_API}testimonials`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        "Response status:",
        response.status,
        "Status Text:",
        response.statusText
      );
      return res
        .status(response.status)
        .json({ message: "Failed to fetch data" });
    }

    const data = await response.json();

    // Mapping over the data to extract only the required fields
    const results = await Promise.all(
      data.map(async (testimonial) => {
        // Fetching the image URL
        const imageUrl = await getImageUrl(
          testimonial._links["wp:featuredmedia"][0].href
        );
        // Assuming the content is directly accessible in the testimonial object
        const content = testimonial.acf.content; // Adjust this line based on your actual data structure
        const name = testimonial.acf.name;
        const designation = testimonial.acf.designation;
        // Returning only the desired properties
        return {
          content,
          imageUrl,
          name,
          designation,
        };
      })
    );

    return res.status(200).json({ result: results });
  } catch (error) {
    console.error("There has been a critical server error:", error);
    return res.status(500).send({
      message: "An unexpected error occurred",
    });
  }
});

app.get("/get-footer-content", async (req, res) => {
  const response = await axios.get(`${process.env.WORDPRESS_API}footer`, {
    headers: {
      "conatent-type": "appication/json",
    },
  });
  const result = response.data;
  res.status(200).send({ result: result[0].acf });
});

app.get("/magic-tool", async (req, res) => {
  try {
    const response = await fetch(`${process.env.WORDPRESS_API}magic_tool`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        "Response status:",
        response.status,
        "Status Text:",
        response.statusText
      );
      return res
        .status(response.status)
        .json({ message: "Failed to fetch data" });
    }

    const data = await response.json();
    console.log(data);

    const results = await Promise.all(
      data.map(async (result) => {
        // Fetching the image URL
        const imageUrl = await getImageUrl(
          result._links["wp:featuredmedia"][0].href
        );

        const magic_titles = result.acf.magic_titles;
        const magic_descriptions = result.acf.magic_descriptions;
        // Returning only the desired properties
        return {
          magic_titles,
          imageUrl,

          magic_descriptions,
        };
      })
    );

    res.send({ result: results });
  } catch (error) {
    console.error("There has been a critical server error:", error);
    return res.status(500).send({
      message: "An unexpected error occurred",
    });
  }
});

app.get("/ai-categories", async (req, res) => {
  try {
    const response = await fetch(`${process.env.WORDPRESS_API}ai-categories`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        "Response status:",
        response.status,
        "Status Text:",
        response.statusText
      );
      return res
        .status(response.status)
        .json({ message: "Failed to fetch data" });
    }

    const data = await response.json();

    // Mapping over the data to extract only the required fields
    const results = await Promise.all(
      data.map(async (testimonial) => {
        // Fetching the image URL
        const imageUrl = testimonial._links["wp:featuredmedia"]
          ? await getImageUrl(testimonial._links["wp:featuredmedia"][0].href)
          : "";
        // Assuming the content is directly accessible in the testimonial object
        const title = testimonial.title.rendered; // Adjust this line based on your actual data structure
        const acf = testimonial.acf;

        // Returning only the desired properties
        return {
          title,
          imageUrl,
          acf,
        };
      })
    );

    return res.status(200).json({ result: results });
  } catch (error) {
    console.error("There has been a critical server error:", error);
    return res.status(500).send({
      message: "An unexpected error occurred",
    });
  }
});

app.get("/the-future-of-ai", async (req, res) => {
  async function aiIcons(url) {
    try {
      const response = await axios.get(url[0].href);
      const content = response.data;
      const icon = content[0].guid.rendered;
      return icon;
    } catch (error) {
      console.log(error);
    }
  }
  try {
    const response = await axios.get(
      `${process.env.WORDPRESS_API}the_future_of_ai_`
    );

    const content = response.data.reverse();
    const title = content.map((post, index) => post.acf.title);
    const description = content.map((post, index) => post.acf.description);

    const iconPromises = content.map(async (post) => {
      try {
        const icon = await aiIcons(post._links["wp:attachment"]);
        return icon;
      } catch (error) {
        console.error(`Error fetching icon for post ${post.id}:`, error);
        return null; // Handle error as appropriate
      }
    });

    // Wait for all promises to resolve
    const icons = await Promise.all(iconPromises);
    const result = { title, description, icons };
    const transformedPosts = result.icons.map((icon, index) => ({
      icon,
      title: result.title[index],
      description: result.description[index],
    }));

    return res.status(200).json({ transformedPosts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

app.get("/custome-template", async (req, res) => {
  try {
    const response = await fetch(
      `${process.env.WORDPRESS_API}custome_template`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(
        "Response status:",
        response.status,
        "Status Text:",
        response.statusText
      );
      return res
        .status(response.status)
        .json({ message: "Failed to fetch data" });
    }

    const data = await response.json();
    console.log(data);

    const result = data.map((item) => item.acf);
    return res.status(200).json({ result: result });
  } catch (error) {
    console.error("There has been a critical server error:", error);
    return res.status(500).send({
      message: "An unexpected error occurred",
    });
  }
});

app.get("/get-pricing", async (req, res) => {
  try {
    const response = await axios.get(
      "https://zzz.codeshastra.dev/wp-json/wp/v2/pricing"
    );

    const content = response.data.reverse();
    const title = content.map((post, index) => post.acf.button_title);
    const message = content.map((post, index) => post.acf.message);
    const cards = content.map((post, index) => post.acf.card);

    const result = { title, message, cards };
    const transformedPosts = result.title.map((post, index) => ({
      title: result.title[index],
      message: result.message[index],
      cards: result.cards[index],
    }));

    return res.status(200).json({ transformedPosts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

app.get("/roles", async (req, res) => {
  const response = await axios.get(`${process.env.WORDPRESS_API}roles`, {
    headers: {
      "conatent-type": "appication/json",
    },
  });
  const result = response.data;
  const data = result.map((item) => item.acf);
  res.status(200).send({ result: data });
});
// Start the server

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
