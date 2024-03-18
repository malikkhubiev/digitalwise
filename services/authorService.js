const { Sequelize } = require("../db");
const { User, AuthorFollowers} = require("../models");
const { transformNumber } = require("./common");

class authorService {
    // Доделать
    getAuthorProfile = async (ownId, authorId) => {
        const author = await User.findOne({ where: { id: authorId } });
        const authorCopy = JSON.parse(JSON.stringify(author));
        ["createdAt", "updatedAt", "password"]
            .forEach(key => delete authorCopy[key]);

        // followers and followings
        let followersIds = await AuthorFollowers.findAndCountAll({
            where: { authorId },
            attributes: ["FollowerId"]
        });
        if (followersIds.rows.length) {
            followersIds = followersIds.rows.map(id => id.dataValues.FollowerId);
        } else {
            followersIds = [];
        };
        let followingIds = await AuthorFollowers.findAndCountAll({
            where: { FollowerId: authorId },
            attributes: ["authorId"]
        });
        if (followingIds.rows.length) {
            followingIds = followingIds.rows.map(id => id.dataValues.authorId);
        } else {
            followingIds = [];
        };
        let followers = await User.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: followersIds
                }
            },
            attributes: ["id", "avatar", "name"]
        });
        let ownFollowingIds = await AuthorFollowers.findAndCountAll({
            where: { FollowerId: ownId },
            attributes: ["authorId"]
        });
        if (ownFollowingIds.rows.length) {
            ownFollowingIds = ownFollowingIds.rows.map(id => id.dataValues.authorId);
        } else {
            ownFollowingIds = [];
        };
        followers = followers.map(follower => {
            const returnValue = { ...follower.dataValues };
            if (ownFollowingIds.includes(follower.id))
                returnValue.amIFollowed = true;
            return returnValue;
        });
        let following = await User.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: followingIds
                }
            },
            attributes: ["id", "avatar", "name"]
        });
        following = following.map(followinger => ({
            ...followinger.dataValues,
            amIFollowed: true
        }));

        const followersNumber = transformNumber(filteredFollowers.length);
        const followingNumber = transformNumber(filteredFollowing.length);
        authorCopy.followers = { list: followers, number: followersNumber || "0" };
        authorCopy.following = { list: following, number: followingNumber || "0" };
        
        // isOwn
        if (ownId === authorId) authorCopy.isOwn = true;
        else authorCopy.isOwn = false;

        // amIFollowed
        let amIFollowed = false;

        if (ownId === authorId) amIFollowed = false;
        else {
            followersIds.forEach(followerId => {
                if (followerId === ownId) amIFollowed = true;
            });
        };
        authorCopy.amIFollowed = amIFollowed;
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