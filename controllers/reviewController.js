const { transformController } = require("./utils");

class reviewController {
  get = async (req, res) => {
    const { bookId, authorId, limit, offset } = req.params;

    if (!bookId && !authorId) throw new Error("Params are required"); 
    
    const reviews = await get(bookId, authorId, limit, offset);
    return res.json(reviews);
  };
  create = async (req, res) => {
    const { id: authorId, bookId, content } = req.body;

    if (!content) throw new Error("Content is required");

    const review = await create(authorId, bookId, content);
    return res.json(review);
  };
  change = async (req, res) => {
    const { id: authorId, bookId, content } = req.body;
    const updated_review = await change(authorId, bookId, content);
    return res.json(updated_review);
  };
  toggle_like = async (req, res) => {
    const { id: authorId, bookId, reviewId } = req.body;
    
    if (!bookId) throw new Error("No bookId");
    if (!reviewId) throw new Error("No reviewId");
    
    const is_liked = await toggle_like(authorId, bookId, reviewId);
    return res.json({ message: is_liked });
  };
  delete = async (req, res) => {
    const { reviewId } = req.body.data;
    
    if (!reviewId) throw new Error("No reviewId");
    
    await deleteReview(reviewId);
    return res.json({ message: "deleted" });
  };
}

module.exports = transformController(new reviewController());