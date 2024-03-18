const { transformController } = require("./utils");

class quoteController {
  get = async (req, res) => {
    const { bookId, authorId, limit, offset } = req.params;

    if (!bookId && !authorId) throw new Error("Params are required"); 
    
    const quotes = await get(bookId, authorId, limit, offset);
    return res.json(quotes);
  };
  create = async (req, res) => {
    const { id: authorId, content } = req.body;

    if (!content) throw new Error("Content is required");

    const quote = await create(authorId, content);
    return res.json(quote);
  };
  change = async (req, res) => {
    const { id: authorId, content } = req.body;
    const updated_quote = await change(authorId, content);
    return res.json(updated_quote);
  };
  toggle_like = async (req, res) => {
    const { id: authorId, quoteId } = req.body;
    
    if (!quoteId) throw new Error("No quoteId");
    
    const is_liked = await toggle_like(authorId, quoteId);
    return res.json({ message: is_liked });
  };
  delete = async (req, res) => {
    const { quoteId } = req.body.data;
    
    if (!quoteId) throw new Error("No quoteId");
    
    await deleteQuote(quoteId);
    return res.json({ message: "deleted" });
  };
}

module.exports = transformController(new quoteController());
