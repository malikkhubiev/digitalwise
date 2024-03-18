const { Sequelize } = require("../db");
const { User, Image, Preference, ImageTag, Tag, SavedImage, UserBlocked, UserFollowers, Comment } = require("../models");

class wsService {
    getHomepageRecievers = async (userId) => {
        const followingUsers = await UserFollowers.findAll({where: {followerId: userId}});
        const result = followingUsers.map(user => 
            user.dataValues.userId
        );
        result.push(userId);
        return result;
    };
};

module.exports = new wsService();