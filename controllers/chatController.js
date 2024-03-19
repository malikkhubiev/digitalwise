const ApiError = require("../error/ApiError");
const { get, create, clearOne, deleteOne, deleteAll, clearAll } = require("../services/chatService");

class chatController {
    create = async(req, res, next) => {
        try {
            const {id: firstChatterId, secondChatterId} = req.body;
            if (!firstChatterId || !secondChatterId)
                throw new Error("Not enough chatters provided");
            const chatId = await create(firstChatterId, secondChatterId);
            res.json({chatId});
        } catch (e) {
            next(ApiError.badRequest(e.message || "Something went wrong"));
        };
    };
    get = async(req, res, next) => {
        try {
            const {id: oneOfChattersId} = req.body;
            const chats = await get(oneOfChattersId);
            res.json(chats);
        } catch (e) {
            next(ApiError.badRequest(e.message || "Something went wrong"));
        };
    };
    clearOne = async(req, res, next) => {
        try {
            const { id: chatterId } = req.body;
            const { chatId } = req.body.data;
            if (!chatId) throw new Error(
                "You didn't specify which chat you want to clear"
            );
            await clearOne(chatId, chatterId);
            res.json({chatId});
        } catch (e) {
            next(ApiError.badRequest(e.message || "Something went wrong"));
        }
    };
    deleteOne = async(req, res, next) => {
        try {
            const { id: chatterId } = req.body;
            const { chatId } = req.body.data;
            if (!chatId) throw new Error(
                "You didn't specify which chat you want to clear"
            );
            await deleteOne(chatId, chatterId);
            res.json({chatId});
        } catch (e) {
            next(ApiError.badRequest(e.message || "Something went wrong"));
        };
    };
    clearAll = async(req, res, next) => {
        try {
            const { id: chatterId } = req.body;
            await clearAll(chatterId);
            res.json({message: "All chats were successfully cleared"})
        } catch (e) {
            next(ApiError.badRequest(e.message || "Something went wrong"));
        };
    };
    deleteAll = async(req, res, next) => {
        try {
            const { id: chatterId } = req.body;
            await deleteAll(chatterId);
            res.json({message: "All chats were successfully deleted"})
        } catch (e) {
            next(ApiError.badRequest(e.message || "Something went wrong"));
        };
    };
};

module.exports = new chatController();