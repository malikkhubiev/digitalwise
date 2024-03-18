const { Router } = require("express");
const quoteController = require("../controllers/quoteController");

const quoteRouter = new Router();

quoteRouter.get("/get/:book/:author/:limit/:offset", quoteController.get);
quoteRouter.post("/create", quoteController.create);
quoteRouter.put("/change", quoteController.change);
quoteRouter.put("/toggle_like", quoteController.toggle_like);
quoteRouter.delete("/delete", quoteController.delete);

module.exports = quoteRouter;