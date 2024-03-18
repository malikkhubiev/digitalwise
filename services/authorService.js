const { Sequelize } = require("../db");
const { User, AuthorFollowers, Book, Summary, Quote} = require("../models");
const { transformNumber } = require("./utils");

class authorService {
    // Доделать
    getAuthorProfile = async (ownId, authorId) => {
        const author = await User.findOne({ where: { id: authorId } });
        const authorCopy = JSON.parse(JSON.stringify(author));
        ["createdAt", "updatedAt", "password"]
            .forEach(key => delete authorCopy[key]);

        // followers and followings
        addFollowersInfo(ownId, authorId, authorCopy);

        // books, summaries, quotes
        const books = await Book.findAll({
            where: {
                authorId
            }
        });
        const summaries = await Summary.findAll({
            where: {
                authorId
            }
        });
        const quotes = await Quote.findAll({
            where: {
                authorId
            }
        });
        authorCopy["books"] = books;
        authorCopy["summaries"] = summaries;
        authorCopy["quotes"] = quotes;
        
        return authorCopy;
    };
    follow = async (followerId, followingId) => {
        await AuthorFollowers.create({
            FollowerId: followerId,
            authorId: followingId
        });
    };
    unFollow = async (followerId, unFollowingId) => {
        await AuthorFollowers.destroy({
            where: {
                FollowerId: followerId,
                authorId: unFollowingId
            }
        });
    };
};

module.exports = new authorService();