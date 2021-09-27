const fs = require("fs");
const path = require("path");
const imagesDirPath = path.join(__dirname, "..", "images");

const getImageNames = async (req, res) => {
  try {
    const imageNames = await returnFilesByExt("png");
    res.status(200).json({ imageNames });
  } catch (err) {
    console.log(err);
  }
};

const getImage = (req, res) => {
  try {
    const { name } = req.params;
    // console.log({ fileName });
    const imagePath = path.join(__dirname, "..", "images", name);
    res.sendFile(imagePath);
  } catch (err) {
    console.log(err);
  }
};

const getImageMetadata = async (req, res) => {
  try {
    const { name } = req.params;
    let metadata = await returnFilesByExt("txt");
    const metadataPath = path.join(__dirname, "..", "images", metadata[0]);
    fs.readFile(metadataPath, "utf8", (err, data) => {
      if (err) throw err;
      const imagesData = data.split("\n");
      imageData = "";
      tableHead = imagesData[0].split("\t");
      imagesData.map((el) => {
        if (el.indexOf(`${name}\t`) === 0) {
          imageData = el.split("\t");
        } else {
        }
      });
      let imageObj = {};
      imageData.map((el, index) => {
        imageObj[tableHead[index].toString()] = el.toString();
      });
      res.status(200).json({ imageObj });
    });
  } catch (err) {
    console.log(err);
  }
};

const returnFilesByExt = async (ext) => {
  let res = [];
  let resArray = await fs.readdirSync(imagesDirPath, function (err, files) {
    if (err) {
      return err;
    } else {
      return res;
    }
  });
  resArray = resArray.filter((el) => el.slice(-3) == ext);
  return resArray;
};

module.exports = {
  getImageNames,
  getImage,
  getImageMetadata,
};
