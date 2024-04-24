import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const URL = "https://v2.jokeapi.dev/joke/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
try{

  res.render("index.ejs", {content: "tell me a joke"  });

}catch(error){
  console.error("Failed to make request:", error.message);
  res.render("index.ejs", {
    error: error.message,
  });
}});

app.post("/", async (req, res) => {
  const category = req.body.category;
  try {
    const response = await axios.get(URL+category);
    const result = response.data;
  
    res.render("index.ejs", { content: JSON.stringify(result) });

  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});
app.listen(port, () => {
  console.log(`your server is running on the ${port}..`);
});
