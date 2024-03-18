const {
  Genre,
} = require("../models");

class genreService {
  create = async (name) => {
    await Genre.create({ name });
    return;
  };
}

module.exports = new genreService();