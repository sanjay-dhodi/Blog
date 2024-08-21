const homePageRender = async (req, resp) => {
  try {
    const postData = await fetch("http://localhost:8080/api/post");
    const postArray = await postData.json().then((result) => result);

    let errmsg;
    if (postArray === "no posts available") {
      errmsg = "no post available";
      resp.render("index", { postData: undefined, err: errmsg });
    } else {
      resp.render("index", { postData: postArray, err: errmsg });
    }
  } catch (error) {
    // console.log(error);
  }
};

module.exports = { homePageRender };
