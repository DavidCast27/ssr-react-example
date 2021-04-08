const ItemsService = require('../services/items.service');
const { return200, return400s } = require('../commons/http/responses');
const { NOT_FOUND } = require('../commons/http/responseStatus');

let itemsService;

class ItemsController {
  constructor() {
    itemsService = new ItemsService();
  }

  async readAll(req, res) {
    const query = req.query.q;
    try {
      const result = await itemsService.readAll(query);
      return200(res, result);
    } catch (err) {
      const error = err && err.message || '';
      const status = err && err.status || NOT_FOUND;
      return400s({ res, error, status });
    }
  }

  async readById(req, res) {
    const { id } = req.params;
    try {
      const result = await itemsService.readById(id);
      return200(res, result);
    } catch (err) {
      const error = err && err.message || '';
      const status = err && err.status || NOT_FOUND;
      return400s({ res, error, status });
    }
  }
}

module.exports = ItemsController;
