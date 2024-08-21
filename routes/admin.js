const express = require("express");
const router = express.Router();
const verifyUser = require("../middlewere/jwt_verify");
const adminController = require("../controllers/admin");

router.get("/admin", verifyUser, adminController.renderAdminHome);

module.exports = router;
