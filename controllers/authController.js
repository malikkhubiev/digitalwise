const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const {
  signup,
  deleteAccount,
  signin,
  changePassword,
  saveVerificationCode,
  checkingEmail,
  getIsAuth,
  compareCode,
} = require("../services/authService");
const sendEmail = require("../emailStuff/emailService");
const { transformController } = require("./utils");

const SECRET_KEY = process.env.SECRET_KEY;

const generateJwt = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
};

const encryptEmail = (email) => {
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: "24h" });
};

class authController {
  getIsAuth = async (req, res, next) => {
    const { id: userId } = req.body;
    const { id, name, avatar, payload } = await getIsAuth(
      userId
    );
    const token = generateJwt(payload);
    res.json({ id, name, avatar, token });
  };
  signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email) throw new Error("You didn't provide an email");
    if (!password) throw new Error("You didn't provide a password");
    const { id, name, avatar, payload } = await signin(
      email,
      password
    );
    const token = generateJwt(payload);
    res.json({ id, name, avatar, token });
  };
  signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errorsString = "";
      errors.array().forEach((error) => {
        errorsString += `${error.param} `;
      });
      let errorMessage;
      if (errors.array().length === 1)
        errorMessage = errorsString + "parameter is invalid";
      else errorMessage = errorsString + "parameters are invalid";
      throw new Error(errorMessage);
    }

    const { email, password, name } = req.body;
    await signup(email, password, name);
    return res.json({ message: "You have successfully registered" });
  };
  checkingEmail = async (req, res, next) => {
    const { email, process } = req.body;
    if (!email) throw new Error("You didn't provide an email");
    if (!process)
      throw new Error(
        "You didn't provide what do you want: to sign up / to changePassword"
      );
    await checkingEmail(email, process);
    const code = await sendEmail(email);
    await saveVerificationCode(email, code);
    res.json({
      message:
        "A message has been sent to your mail, read the letter and confirm",
    });
  };
  compareCode = async (req, res, next) => {
    const { email, code } = req.body;
    if (!email) throw new Error("You didn't provide an email");
    if (!code) throw new Error("You didn't provide a code");
    await compareCode(email, code);
    const encryptedEmail = encryptEmail(email);
    res.json({ encryptedEmail });
  };
  changePassword = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errorsString = "";
      errors.array().forEach((error) => {
        errorsString += `${error.param} `;
      });
      let errorMessage;
      if (errors.array().length === 1)
        errorMessage = errorsString + "parameter is invalid";
      else errorMessage = errorsString + "parameters are invalid";
      throw new Error(errorMessage);
    }

    const { email, password } = req.body;
    await changePassword(email, password);
    res.json({ message: "Password has been successfully changed" });
  };
  changeNameAvatarAboutMe = async (req, res, next) => {
    let { id, name, about_me } = req.body;
    let avatar = null;
    if (req.files && req.files.avatar) {
      avatar = req.files.avatar;
    }

    if (!name && !avatar && !about_me)
      throw new Error("You didn't provide any new data");

    const response = await changeNameAvatarAboutMe(id, name, avatar, about_me);
    res.json(response);
  };
  deleteAccount = async (req, res, next) => {
    const { id, password } = req.body;
    if (!password) throw new Error("You didn't provide a password");
    await deleteAccount(id, password);
    res.json({ message: "Your account successfully deleted" });
  };
}

module.exports = transformController(new authController());
