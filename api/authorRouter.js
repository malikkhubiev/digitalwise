const { Router } = require("express");
const authorController = require("../controllers/authorController");

const authorRouter = new Router();

authorRouter.get("/get/", authorController.getAuthorsProfiles);
authorRouter.get("/get/:authorId", authorController.getAuthorProfile);
authorRouter.post("/follow", authorController.follow);
authorRouter.post("/unFollow", authorController.unFollow);

module.exports = authorRouter;