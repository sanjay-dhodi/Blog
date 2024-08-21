const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/postimages");
  },
  filename: function (req, file, cb) {
    const randomNumber = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + randomNumber + fileExtension);
  },
});

const fileFilter = function (req, file, cb) {
  // Check file type (example: allow only images)
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are allowed."), false);
  }
};

const uploads = multer({ storage: storage, fileFilter: fileFilter });

module.exports = uploads;
