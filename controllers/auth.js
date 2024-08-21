require("dotenv").config();
const userModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// login
const getLoginPage = (req, resp) => {
  resp.render("admin/login", { err: "" });
};

const postLogin = async (req, resp) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (username && password !== undefined) {
      const user = await userModel.findOne({ username: username });

      if (user === null || user === undefined) {
        console.log("User not found with this username");
      } else {
        const result = await bcrypt.compare(password, user.password);

        if (!result) {
          console.log("Wrong password");
          resp.redirect("/admin/login");
        } else {
          const { password, ...userWithoutPassword } = user._doc;
          const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRETE, {
            expiresIn: "1h",
          });

          resp.cookie("access_token", token, {
            httpOnly: true,
            secure: true,
          });

          resp.redirect("/admin");
        }
      }
    } else {
      console.log("please enter email or password");
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
};

// render register page
const getRegisterPage = (req, resp) => {
  resp.render("admin/register", { err: "" });
};

// register page post request handler

const postRegister = async (req, resp) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const existingUser = await userModel.findOne({ username: username });

    if (existingUser) {
       console.log("User with this username already exists");
    } else {
      const hash = await bcrypt.hash(password, 12);

      const user = new userModel({
        username: username,
        password: hash,
      });

      await user.save();
      // console.log("User successfully created");
    }
  } catch (error) {
     console.error("Error creating user:", error.toString());
  }

  resp.redirect("/admin/login");
};

module.exports = { getLoginPage, getRegisterPage, postLogin, postRegister };
