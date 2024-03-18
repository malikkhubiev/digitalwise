const { follow, block, unBlock, getUserProfile, getOwnAndFollowingImages, getPreferences, getImages, setPreferences, unFollow, getImagesByPreferences, sendASubscriptionRequest, getRequests, confirmSubRequest, denySubRequest } = require("../services/authorService");

class authorController {
    // Доделать
    getAuthorsProfiles = async (req, res, next) => {
        let { id: ownId } = req.body;
        let authorId = +req.params.userId.slice(1);
        if (!authorId) userId = ownId;
        const profile = await getAuthorProfile(ownId, authorId);
        res.json(profile);
    };
    getAuthorProfile = async (req, res, next) => {
        let { id: ownId } = req.body;
        let authorId = +req.params.userId.slice(1);
        if (!authorId) authorId = ownId;
        const profile = await getAuthorProfile(ownId, authorId);
        res.json(profile);
    };
    follow = async (req, res, next) => {
        const { id: followerId, followingId } = req.body;
        if (!followerId) next(ApiError.badRequest("No following id"));
        if (!followingId) throw new Error(
            "You didn't provide the author you want to follow"
        );
        await follow(followerId, followingId);
        res.json({message: "You followed"});
    };
    unFollow = async (req, res, next) => {
        const { id: followerId, unFollowingId } = req.body;
        if (!unFollowingId) next(ApiError.badRequest("No unFollowing id"));
        if (!followerId) throw new Error(
            "You didn't provide the author you want to unfollow"
        );
        await unFollow(followerId, unFollowingId);
        res.json({message: "You unFollowed"});
    };
};

module.exports = new authorController();