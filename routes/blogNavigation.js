const router = require("express").Router();
const blogPageNavigationController = require("../controllers/blogNavigation");

router.get("/", blogPageNavigationController.homePageRender);

module.exports = router;
