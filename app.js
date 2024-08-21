const express = require("express");

const postRoutes = require("../morning_blog/routes/post");
const blogPageNavigation = require("../morning_blog/routes/blogNavigation");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

// setting ejs view engine
app.set("view engine", "ejs");
app.use(express.static(path.join("public")));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

app.use(authRoutes);
app.use(blogPageNavigation);
app.use(postRoutes);
app.use(adminRoutes);

app.use((err, req, resp, next) => {
  const errrstatus = err.status || 500;
  const massage = err.message || "something wrong ";

  return resp.status(errrstatus).json({
    success: "false",
    errrstatus,
    massage,
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log("server run on 8080 port");
});
