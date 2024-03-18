const { Router } = require("express");
const bookController = require("../controllers/bookController")
const bookRouter = new Router();

bookRouter.get("/get/:name_substr/:genre/:authors_substr/:limit/:offset", bookController.get);
bookRouter.post("/create", bookController.create);
bookRouter.put("/change", bookController.change);
bookRouter.put("/toggle_like", bookController.toggle_like);
module.exports = bookRouter;