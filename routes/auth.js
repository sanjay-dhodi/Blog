const router = require("express").Router();
const authController = require("../controllers/auth");
const { body } = require("express-validator");

const loginValidationList = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .escape(),
];

router.get("/admin/login", authController.getLoginPage);
router.post("/admin/login", loginValidationList, authController.postLogin);

router.get("/admin/register", authController.getRegisterPage);
router.post("/admin/register", authController.postRegister);

module.exports = router;
