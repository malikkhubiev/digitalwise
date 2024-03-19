const {
  Book,
  BookLike,
} = require("../models");

class bookService {
  get = async (name_substr, genre, authors_substr, limit, offset) => {
    const query = {
      where: {},
    };
    if (name_substr) query.where.name = { [Op.like]: `%${name_substr}%` };
    if (genre) query.where.genre = { [Op.like]: `%${genre}%` };
    if (authors_substr)
      query.where.authors_substr = { [Op.like]: `%${authors_substr}%` };
    if (offset) query.offset = offset;
    if (limit) query.limit = limit;

    const books = await Book.findAndCountAll(query);
    return books;
  };
  create = async (name, genre, cover, authors, materials) => {
    const book = await Book.create({ name, genre, cover, authors, materials });
    return book;
  };
  change = async (bookId, name, genre, cover, authors, materials) => {
    const to_update = {};

    if (name) to_update.name = name;
    if (genre) to_update.genre = genre;
    if (cover) to_update.cover = cover;
    if (authors) to_update.authors = authors;
    if (materials) to_update.materials = materials;

    const book = await Book.update(to_update, { where: { id: bookId } });
    return book;
  };
  toggle_like = async (authorId, bookId) => {
    const like = await BookLike.findOne(
      {where: {authorId,bookId}},
      {rejectOnEmpty: false}
    );
    let is_liked;
    if (like) {
      await BookLike.destroy({
        where: {authorId,bookId}
      });
      is_liked = false;
    } else {
      await BookLike.create({ authorId, bookId });
      is_liked = true;
    }
    return is_liked;
  };
}

module.exports = new bookService();
