const {
  Quote,
  QuoteLike,
} = require("../models");

class bookService {
  get = async (bookId, authorId, limit, offset) => {
    const query = {
      where: {},
    };
    if (bookId) query.where.bookId = bookId;
    if (authorId) query.where.authorId = authorId;
    if (offset) query.offset = offset;
    if (limit) query.limit = limit;

    const quotes = await Quote.findAndCountAll(query);
    return quotes;
  };
  create = async (authorId, content) => {
    const quote = await Quote.create({ authorId, content });
    return quote;
  };
  change = async (authorId, content) => {
    const quote = await Quote.update(
      { content },
      {where: {authorId}}
    );
    return quote;
  };
  toggle_like = async (authorId, quoteId) => {
    const like = await QuoteLike.findOne(
      {where: {authorId, quoteId}},
      {rejectOnEmpty: false}
    );
    let is_liked;
    if (like) {
      await QuoteLike.destroy({
        where: {authorId, quoteId}
      });
      is_liked = false;
    } else {
      await QuoteLike.create({ authorId, quoteId });
      is_liked = true;
    }
    return is_liked;
  };
  deleteQuote = async (quoteId) => {
    await Quote.destroy({
        where: {quoteId}
    });
};
}

module.exports = new bookService();