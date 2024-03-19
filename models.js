const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./db");

// Common fields
const id = {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
};

const stringArr = {
    type: DataTypes.STRING,
    defaultValue: "[]"
}

const email = { type: DataTypes.STRING, unique: true, allowNull: false };

// One-to-many models
const Author = sequelize.define("author", {
    id,
    email,
    password: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    avatar: { type: DataTypes.STRING },
    about_me: { type: DataTypes.STRING, defaultValue: '.' },
    library: { type: DataTypes.STRING, defaultValue: '.' },
});

const VerificationCode = sequelize.define("verificationCode", {
    id,
    email,
    code: { type: DataTypes.INTEGER, allowNull: false }
});

const Chat = sequelize.define("chat", {
    id,
    name: { type: DataTypes.STRING, defaultValue: "." },
    description: { type: DataTypes.STRING, defaultValue: "." },
});

const ChatMessage = sequelize.define("chat_message", {
    id,
    content: { type: DataTypes.STRING, allowNull: false },
});

const Book = sequelize.define("book", {
    id,
    name: { type: DataTypes.STRING, allowNull: false },
    genre: { type: DataTypes.STRING, allowNull: false },
    cover: { type: DataTypes.STRING, allowNull: false },
    book_authors: { type: DataTypes.STRING, defaultValue: "."},
    materials: stringArr
});

const Summary = sequelize.define("summary", {
    id,
    content: { type: DataTypes.STRING, defaultValue: "." },
});

const Quote = sequelize.define("quote", {
    id,
    content: { type: DataTypes.STRING, defaultValue: "." },
});

// Many-to-many models
const AuthorFollowers = sequelize.define("authorFollowers");
const BookLike = sequelize.define("book_like");
const SummaryLike = sequelize.define("summary_like");
const QuoteLike = sequelize.define("quote_like");
const Review = sequelize.define("review", {
    id,
    content: { type: DataTypes.STRING, defaultValue: "." },
});
const ReviewLike = sequelize.define("review_like");
const ChatMember = sequelize.define("chat_member", {
    role: { type: DataTypes.STRING, defaultValue: "usual" }, // or admin
});

// Reference data
const Genre = sequelize.define("genre", { name: { type: DataTypes.STRING, unique: true, allowNull: false } });
const BookAuthor = sequelize.define("book_author", { name: { type: DataTypes.STRING, defaultValue: "." } });

// One-to-one relations
ChatMember.hasMany(ChatMessage, {
    foreignKey: "chatMemberId"
});
ChatMessage.belongsTo(ChatMember);

Chat.hasMany(ChatMessage, {
    foreignKey: "chatId"
});
ChatMessage.belongsTo(Chat);

Book.hasMany(Author, {
    foreignKey: "published"
});
Author.belongsTo(Book);

Author.hasOne(VerificationCode);
VerificationCode.belongsTo(Author);

// Many-to-many relations
Author.belongsToMany(Author, { as: "Followers", through: AuthorFollowers });

Author.belongsToMany(Book, {through: Summary})
Book.belongsToMany(Author, {through: Summary})

Author.belongsToMany(Book, {through: Quote})
Book.belongsToMany(Author, {through: Quote})

Author.belongsToMany(Book, { through: BookLike });
Book.belongsToMany(Author, { through: BookLike });

Author.belongsToMany(Summary, { through: SummaryLike });
Summary.belongsToMany(Author, { through: SummaryLike });

Author.belongsToMany(Quote, { through: QuoteLike });
Quote.belongsToMany(Author, { through: QuoteLike });

Author.belongsToMany(Review, { through: ReviewLike });
Review.belongsToMany(Author, { through: ReviewLike });

Author.belongsToMany(Book, {through: Review})
Book.belongsToMany(Author, {through: Review})

Author.belongsToMany(Chat, {through: ChatMember});
Chat.belongsToMany(Author, {through: ChatMember});

ChatMember.belongsToMany(Chat, {through: ChatMessage});
Chat.belongsToMany(ChatMember, {through: ChatMessage});

module.exports = {
    Author,
    VerificationCode,
    Chat,
    ChatMessage,
    Book,
    Summary,
    Quote,
    Review,
    Genre,
    BookAuthor,
    ChatMember,
    AuthorFollowers,
    BookLike,
    SummaryLike,
    QuoteLike,
    ReviewLike,
    ChatMember
}