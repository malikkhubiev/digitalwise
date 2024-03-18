const { Router } = require("express");
const genreController = require("../controllers/genreController");

const genreRouter = new Router();

genreRouter.post("/create", genreController.create);

module.exports = genreRouter;