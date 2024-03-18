const { Router } = require("express");
const authRouter = require("./authRouter");
const checkIsAuthMiddleware = require("../middleware/checkIsAuthMiddleware");
const bookRouter = require("./bookRouter");
const quoteRouter = require("./quoteRouter");
const authorRouter = require("./authorRouter");
const genreRouter = require("./genreRouter");
const reviewRouter = require("./reviewRouter");

const router = new Router();

router.use("/auth", authRouter);
router.use("/author", authorRouter);
router.use("/book", bookRouter)
router.use("/genre", genreRouter)
router.use("/quote", quoteRouter)
router.use("/review", reviewRouter)
// router.use("/author", checkIsAuthMiddleware, authorRouter);
// router.use("/book", checkIsAuthMiddleware, bookRouter)
// router.use("/genre", checkIsAuthMiddleware, genreRouter)
// router.use("/quote", checkIsAuthMiddleware, quoteRouter)
// router.use("/review", checkIsAuthMiddleware, reviewRouter)

module.exports = router;