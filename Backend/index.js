const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/search", async (req, res) => {
  try {
    // Handle the query properly
    const query = req.query.query || "news";

    // Fetch YouTube results
    const youtubeResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: "snippet",
          q: query,
          key: process.env.YOUTUBE_API_KEY, // Make sure to use env variable here
          maxResults: 5,
        },
      }
    );

    // Fetch Google Custom Search results
    const googleResponse = await axios.get(
      `https://www.googleapis.com/customsearch/v1`,
      {
        params: {
          key: process.env.GOOGLE_CUSTOM_SEARCH_KEY, // Use the environment variable for your key
          cx: process.env.GOOGLE_CUSTOM_SEARCH_CX, // Use environment variable for CSE ID
          q: query,
        },
      }
    );

    // Combine results
    const results = {
      youtube: youtubeResponse.data.items,
      google: googleResponse.data.items,
    };

    res.json(results);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching search results." });
  }
});

// Suggestion endpoint (no issues here)
app.get("/suggestions", async (req, res) => {
  const query = req.query.q || "news";
  try {
    const response = await axios.get(
      `http://suggestqueries.google.com/complete/search?client=firefox&q=${query}`
    );
    res.json(response.data[1]);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
