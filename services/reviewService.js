const {
  Quote,
  QuoteLike,
  Review,
  ReviewLike,
} = require("../models");

class reviewService {
  get = async (bookId, authorId, limit, offset) => {
    const query = {
      where: {bookId, authorId},
    };
    if (offset) query.offset = offset;
    if (limit) query.limit = limit;

    const reviews = await Review.findAndCountAll(query);
    return reviews;
  };
  create = async (authorId, bookId, content) => {
    const review = await Review.create({ authorId, bookId, content });
    return review;
  };
  change = async (authorId, bookId, content) => {
    const review = await Review.update(
      { content },
      {where: {authorId, bookId}}
    );
    return review;
  };
  toggle_like = async (authorId, bookId, reviewId) => {
    const like = await ReviewLike.findOne(
      {where: {reviewId}},
      {rejectOnEmpty: false}
    );
    let is_liked;
    if (like) {
      await ReviewLike.destroy({
        where: {reviewId}
      });
      is_liked = false;
    } else {
      await ReviewLike.create({ authorId, bookId, reviewId });
      is_liked = true;
    }
    return is_liked;
  };
  deleteReview = async (reviewId) => {
    await Review.destroy({
        where: {reviewId}
    });
};
}

module.exports = new reviewService();