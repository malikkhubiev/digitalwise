const { Router } = require("express");
const { check } = require("express-validator");
const checkIsAuthMiddleware = require("../middleware/checkIsAuthMiddleware");
const emailEncryptingMiddleware = require("../middleware/emailEncryptingMiddleware");
const authController = require("../controllers/authController");

const authRouter = new Router();

const authValidationArray = [
    check("email").isEmail(),
    check("password").isLength({ min: 8 }),
    check("name").isLength({min: 1, max: 150})
];
console.log(13)
authRouter.get("/getIsAuth", checkIsAuthMiddleware, authController.getIsAuth);
console.log(14)
authRouter.post("/signin", authController.signin);
console.log(15)
authRouter.post("/signup", emailEncryptingMiddleware, authValidationArray, authController.signup);
console.log(16)
authRouter.post("/checkingEmail", [
    check("email").isEmail()
], authController.checkingEmail);
console.log(17)
authRouter.post("/compareCode", authController.compareCode);
console.log(18)
authRouter.put("/changePassword", emailEncryptingMiddleware, authValidationArray.slice(0, 2), authController.changePassword);
console.log(19)
authRouter.put("/changeNameAvatarAboutMe", checkIsAuthMiddleware, authController.changeNameAvatarAboutMe);
console.log(20)
authRouter.delete("/deleteAccount", checkIsAuthMiddleware, authController.deleteAccount);

module.exports = authRouter;