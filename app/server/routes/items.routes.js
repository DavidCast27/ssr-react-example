const { Router } = require('express');
const ItemsController = require('../controllers/items.controller');

const router = Router();
const itemsController = new ItemsController();
router.get('/', itemsController.readAll);
router.get('/:id', itemsController.readById);

module.exports = router;
