const { Router } = require("express");
const reviewController = require("../controllers/reviewController");

const reviewRouter = new Router();

reviewRouter.get("/get/:bookId/:authorId/:limit/:offset", reviewController.get);
reviewRouter.post("/create", reviewController.create);
reviewRouter.put("/change", reviewController.change);
reviewRouter.put("/toggle_like", reviewController.toggle_like);
reviewRouter.delete("/delete", reviewController.delete);

module.exports = reviewRouter;