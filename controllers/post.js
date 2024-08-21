const postModel = require("../models/post_model");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

// get post
const getPost = async (req, resp) => {
  try {
    const fetchPosts = await postModel.find();

    if (fetchPosts.length > 0) {
      resp.json(fetchPosts);
    } else {
      resp.json("no posts available");
    }
  } catch (error) {
    resp.json(error.toString());
  }
};

// get single post with read more

const readMore = async (req, resp) => {
  const postId = req.params.id;

  try {
    const result = await postModel.findOne({ _id: postId });
    if (!result) {
      resp.json({ "no found post data": result });
    } else {
      resp.render("post", { postData: result, err: "" });
    }
  } catch (error) {
    resp.json(error.toString());
  }
};

// create post
const createPost = async (req, resp) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
     console.log(result);

    // this code is for delete unneccessoy .jfif image file created by multer
    // when other input field occur error but if file input field have files then it created .jfif file by multer
    if (req.file) {
      const imagePath = path.join("public", "postimages", req.file.filename);

      if (fs.existsSync(imagePath)) {
        await fs.promises.unlink(imagePath);
        // console.log("Successfully deleted");
      } else {
        // console.log({ error: "Image file not found" });
      }
    }

    resp.redirect("/admin");
  } else {
    const data = {
      title: req.body.title,
      desc: req.body.desc,
      image: req.file.filename,
    };

    const postData = new postModel(data);
    try {
      const result = await postData.save();

      if (result) {
        resp.redirect("/admin");
      } else {
        resp.json({
          errMsg: "data stored failed",
          errType: err.toString(),
        });
      }
    } catch (error) {
      resp.json("somthing wrong with create post " + error.toString());
    }
  }
};

const renderEditPostPage = async (req, resp) => {
  const postId = req.params.id;

  try {
    const editPost = await postModel.findById(postId);
    resp.render("admin/editpost", { err: "", postData: editPost });
  } catch (error) {
    console.log(error);
  }
};

// edit post
const editPost = async (req, resp) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result);
  } else {
    const id = req.params.id;

    const data = {
      title: req.body.title,
      desc: req.body.desc,
      image: req.file.filename,
    };

    try {
      const result = await postModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );

      if (!result) {
        resp.json({ "no found updated data": result });
      } else {
        resp.json({ "updated data": result });
      }
    } catch (error) {
      resp.json({ error: error.toString() });
    }
  }
};

// delete post
const deletePost = async (req, resp) => {
  const id = req.params.id;

  try {
    const result = await postModel.findByIdAndDelete(id);

    if (!result) {
      resp.status(404).json({ error: "Post not found" });
      return;
    }

    // also delete  image file from destination folder
    const imagePath = path.join("public", "postimages", result.image);

    if (fs.existsSync(imagePath)) {
      await fs.promises.unlink(imagePath);
      resp.json("Successfully deleted");
    } else {
      resp.status(404).json({ error: "Image file not found" });
    }
  } catch (error) {
    // console.error(error.toString());
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getPost,
  readMore,
  createPost,
  editPost,
  deletePost,
  renderEditPostPage,
};
