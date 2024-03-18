const { transformController } = require("./utils");

class summaryController {
  get = async (req, res) => {
    const { bookId, authorId, limit, offset } = req.params;

    if (!bookId && !authorId) throw new Error("Params are required"); 
    
    const summaries = await get(bookId, authorId, limit, offset);
    return res.json(summaries);
  };
  create = async (req, res) => {
    const { id: authorId, bookId, content } = req.body;

    if (!bookId) throw new Error("bookId is required");
    if (!content) throw new Error("Content is required");

    const review = await create(authorId, bookId, content);
    return res.json(review);
  };
  change = async (req, res) => {
    const { id: authorId, bookId, content } = req.body;
    const updated_summary = await change(authorId, bookId, content);
    return res.json(updated_summary);
  };
  toggle_like = async (req, res) => {
    const { id: authorId, bookId, summaryId } = req.body;
    
    if (!summaryId) throw new Error("No summaryId");
    
    const is_liked = await toggle_like(authorId, bookId, summaryId);
    return res.json({ message: is_liked });
  };
  delete = async (req, res) => {
    const { summaryId } = req.body.data;
    
    if (!summaryId) throw new Error("No summaryId");
    
    await deleteSummary(summaryId);
    return res.json({ message: "deleted" });
  };
}

module.exports = transformController(new summaryController());
