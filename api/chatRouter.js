const { Router } = require("express");
const chatController = require("../controllers/chatController");
const checkIsAuthMiddleware = require("../middleware/checkIsAuthMiddleware");

const chatRouter = new Router();

chatRouter.post("/create", checkIsAuthMiddleware, chatController.create);
chatRouter.get("/get", checkIsAuthMiddleware, chatController.get);
chatRouter.delete("/clearOne", checkIsAuthMiddleware, chatController.clearOne);
chatRouter.delete("/deleteOne", checkIsAuthMiddleware, chatController.deleteOne);
chatRouter.delete("/clearAll", checkIsAuthMiddleware, chatController.clearAll);
chatRouter.delete("/deleteAll", checkIsAuthMiddleware, chatController.deleteAll);

module.exports = chatRouter;