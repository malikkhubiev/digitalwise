const { transformController } = require("./utils");

class genreController {
  create = async (req, res) => {
    const { name } = req.body;

    if (!name) throw new Error("name is required");

    await create(name);
    return res.json({message: "done"});
  };
}

module.exports = transformController(new genreController());
