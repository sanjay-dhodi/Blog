const postModel = require("../models/post_model");

const renderAdminHome = async (req, resp) => {
  if (!req.user) {
    resp.redirect("/admin/login");
  } else {
    const postData = await postModel.find();

    resp.render("admin/home", { err: "", postData: postData });
  }
};
module.exports = { renderAdminHome };
