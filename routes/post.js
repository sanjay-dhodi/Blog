const express = require("express");
const postController = require("../controllers/post");
const router = express.Router();
const uploads = require("../utility/multer_imageupload");
const verifyUser = require("../middlewere/jwt_verify");
const { body } = require("express-validator");

// #### post read more
router.get("/api/post/:id", postController.readMore);
router.get("/api/post", postController.getPost);

// validation array
const validationCheck = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("title required")
    .isLength({ min: 10 })
    .withMessage("minimum 10 character long title required")
    .escape(),

  body("desc")
    .trim()
    .notEmpty()
    .withMessage("desc is empty desc required")
    .isLength({ min: 50 })
    .withMessage("enter description || minimum charecter 50")
    .escape(),

  body("image").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Image file is required");
    }
    return true;
  }),
];

// route for create post
router.post(
  "/api/post",
  verifyUser,
  uploads.single("image"),
  validationCheck,
  postController.createPost
);

// route for single post
router.get(
  "/api/post/update/:id",
  verifyUser,
  postController.renderEditPostPage
);

// update post
router.put(
  "/api/post/update/:id",
  verifyUser,
  uploads.single("image"),
  validationCheck,
  postController.editPost
);

// delete post
router.delete("/api/post/delete/:id", verifyUser, postController.deletePost);

module.exports = router;
