const express = require("express");
const imagesController = require("./controllers/images");

const app = express();
port = process.env.PORT || 3000;

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/image", express.static("images"));

app.get("/images", imagesController.getImageNames);
// app.get("/image/:name", imagesController.getImage);
app.get("/metadata/:name", imagesController.getImageMetadata);

app.listen(port, () => {
  console.log("Server is listening to port localhost:3000");
});
