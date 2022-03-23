const express = require("express");
const request = require("request");

const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/medium", async (req, res) => {
  request(
    { url: "https://medium.com/feed/articles-more-every-week" },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        console.log(error);

        return res.status(500).json({ type: "error", message: error });
      }

      res.set("Content-Type", "application/rss+xml");
      res.send(Buffer.from(body));
    }
  );
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
