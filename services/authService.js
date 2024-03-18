const { Author, VerificationCode } = require("../models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const path = require("path");
const Filter = require("bad-words");
const { Sequelize } = require("../db");
const filter = new Filter();

const returnTokenPayload = (author) => {
    return {
        id: author.id,
        email: author.email
    };
};

class authService {
    getIsAuth = async (authorId) => {
        const author = await Author.findOne({ where: { id: authorId } });
        if (!author) throw new Error("There is no such author");
        return {
            id: authorId,
            name: author.name,
            avatar: author.avatar,
            payload: returnTokenPayload(author)
        };
    };
    signin = async (email, password) => {
        const author = await Author.findOne({ where: { email } });
        if (!author) throw new Error("Wrong authorname or password");
        const isPassword = bcrypt.compareSync(password, author.password);
        if (!isPassword) throw new Error("Wrong authorname or password");
        return {
            id: author.id,
            name: author.name,
            avatar: author.avatar,
            payload: returnTokenPayload(author)
        };
    };
    signup = async (email, password, name) => {
        if (filter.isProfane(name)) throw new Error("Your name is profane");
        const hashedPassword = bcrypt.hashSync(password, 3);
        await Author.create({ email, password: hashedPassword, name });
    };
    checkingEmail = async (email, process) => {
        const candidate = await Author.findOne({ where: { email } });
        if (candidate && process === "sign up") throw new Error("Author with the same email is already existing");
        if (!candidate && process === "forgot password") throw new Error("There is no such author");
    };
    saveVerificationCode = async (email, code) => {
        const mayBeExistingCode = await VerificationCode.findOne({ where: { email } });
        if (mayBeExistingCode) return await VerificationCode.update({ code }, { where: { email } });
        await VerificationCode.create({ email, code });
    };
    compareCode = async (email, code) => {
        code = Number(code);
        const realCode = await VerificationCode.findOne({ where: { email } });
        if (realCode.code !== code) throw new Error("Wrong code, try again");
        else await VerificationCode.destroy({where: { email }})
    };
    changePassword = async (email, password) => {
        const hashedPassword = bcrypt.hashSync(password, 3);
        await Author.update({ password: hashedPassword }, { where: { email } });
    };
    changeNameAvatarAboutMe = async (id, name, avatar, about_me) => {
        const response = {};
        if (avatar) {
            const fileName = uuid.v4() + ".jpg";
            avatar.mv(path.resolve(__dirname, "..", "static", fileName));
            await Author.update({avatar: fileName}, {where: {id}});
            response.avatar = fileName;
        };
        if (name) {
            await Author.update({name}, {where: {id}});
            response.name = name;
        };
        if (about_me) {
            await Author.update({about_me}, {where: {id}});
            response.about_me = about_me;
        };
        return response;
    };
    deleteAccount = async (id, password) => {
        const author = await Author.findOne({ where: { id } });
        if (!author) throw new Error("There is no such author");
        const isPassword = bcrypt.compareSync(password, author.password);
        if (!isPassword) throw new Error("You entered the wrong password");
        
        // Destroy everything else

        await Author.destroy({ where: { id } });
    };
};

module.exports = new authService();