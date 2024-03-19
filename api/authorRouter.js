const { Router } = require("express");
const authorController = require("../controllers/authorController");

const authorRouter = new Router();

authorRouter.get("/get/:name_substr/:books_num/:summaries_num/:quotes_num/:limit/:offset", authorController.getAuthorsProfiles);
authorRouter.get("/getOne/:authorId", authorController.getAuthorProfile);
authorRouter.post("/follow", authorController.follow);
authorRouter.post("/unFollow", authorController.unFollow);

module.exports = authorRouter;