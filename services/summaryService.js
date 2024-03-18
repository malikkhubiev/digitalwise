const {
  QuoteLike,
  Review,
  ReviewLike,
  Summary,
  SummaryLike,
} = require("../models");

class summaryService {
  get = async (bookId, authorId, limit, offset) => {
    const query = {
      where: {bookId, authorId},
    };
    if (offset) query.offset = offset;
    if (limit) query.limit = limit;

    const summaries = await Summary.findAndCountAll(query);
    return summaries;
  };
  create = async (authorId, bookId, content) => {
    const review = await Summary.create({ authorId, bookId, content });
    return review;
  };
  change = async (authorId, bookId, content) => {
    const summary = await Summary.update(
      { content },
      {where: {authorId, bookId}}
    );
    return summary;
  };
  toggle_like = async (authorId, bookId, summaryId) => {
    const like = await SummaryLike.findOne(
      {where: {summaryId}},
      {rejectOnEmpty: false}
    );
    let is_liked;
    if (like) {
      await SummaryLike.destroy({
        where: {summaryId}
      });
      is_liked = false;
    } else {
      await SummaryLike.create({ authorId, bookId, summaryId });
      is_liked = true;
    }
    return is_liked;
  };
  deleteSummary = async (summaryId) => {
    await Summary.destroy({
        where: {summaryId}
    });
};
}

module.exports = new summaryService();