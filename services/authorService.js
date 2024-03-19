const { User, AuthorFollowers, Book, Summary, Quote, Author } = require("../models");
const { addFollowersInfo } = require("./utils");

class authorService {
  getAuthorsProfiles = async (params) => {
    const {
        name_substr,
        books_num,
        summaries_num,
        quotes_num,
        limit,
        offset
    } = params;

    const query = { where: {} };
    if (name_substr) query.where.name = { [Op.like]: `%${name_substr}%` };
    if (offset) query.offset = offset;
    if (limit) query.limit = limit;

    const authors = await Author.findAndCountAll(query);
    const paramsToDel = ["createdAt", "updatedAt", "password", "email"];
    
    paramsToDel.forEach((key) => delete authorCopy[key]);

    const authorsArr = [];
    // books, summaries, quotes
    authors.rows.map(async(author) => {
        const books = await Book.findAndCountAll({
            where: {
              authorId: author.id,
            },
        });
        const summaries = await Summary.findAll({
            where: {
                authorId: author.id,
            },
        });
        const quotes = await Quote.findAll({
            where: {
                authorId: author.id,
            },
        });

        if (
            books_num > books.count &&    
            summaries_num > summaries.count &&    
            quotes_num > quotes.count
        ) {
            author.booksNum = books.count;
            author.summariesNum = summaries.count;
            author.quotesNum = quotes.count;
        }

        authorsArr.push(author);
    })

    return authorsArr;
  };
  getAuthorProfile = async (ownId, authorId) => {
    const author = await User.findOne({ where: { id: authorId } });
    const authorCopy = JSON.parse(JSON.stringify(author));
    const isOwn = ownId === authorId;
    const paramsToDel = ["createdAt", "updatedAt", "password"];
    if (!isOwn) paramsToDel.push("email");
    paramsToDel.forEach((key) => delete authorCopy[key]);

    // followers and followings
    addFollowersInfo(ownId, authorId, authorCopy, isOwn);

    // books, summaries, quotes
    const books = await Book.findAll({
      where: {
        authorId,
      },
    });
    const summaries = await Summary.findAll({
      where: {
        authorId,
      },
    });
    const quotes = await Quote.findAll({
      where: {
        authorId,
      },
    });
    authorCopy["books"] = books;
    authorCopy["summaries"] = summaries;
    authorCopy["quotes"] = quotes;

    return authorCopy;
  };
  follow = async (followerId, followingId) => {
    await AuthorFollowers.create({
      FollowerId: followerId,
      authorId: followingId,
    });
  };
  unFollow = async (followerId, unFollowingId) => {
    await AuthorFollowers.destroy({
      where: {
        FollowerId: followerId,
        authorId: unFollowingId,
      },
    });
  };
}

module.exports = new authorService();
