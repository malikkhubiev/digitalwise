const { transformController } = require("./utils");

class bookController {
  get = async (req, res) => {
    const { name_substr, genre, authors_substr, limit, offset } = req.params;
    const books = await get(name_substr, genre, authors_substr, limit, offset);
    return res.json(books);
  };
  create = async (req, res) => {
    const { name, genre, cover, authors, materials } = req.body;

    if (!name) throw new Error("Name is required");
    if (!genre) throw new Error("Genre is required");
    if (!cover) throw new Error("Cover is required");
    if (!materials) throw new Error("Materials are required");

    const book = await create(name, genre, cover, authors, materials);
    return res.json(book);
  };
  change = async (req, res) => {
    const { bookId, name, genre, cover, authors, materials } = req.body;

    const updated_book = await change(bookId, name, genre, cover, authors, materials);
    return res.json(updated_book);
  };
  toggle_like = async (req, res) => {
    const { id: authorId, bookId } = req.body;
    
    if (!bookId) throw new Error("No bookId");
    
    const is_liked = await toggle_like(authorId, bookId);
    return res.json({ message: is_liked });
  };
}

module.exports = transformController(new bookController());
