const _map = require('lodash/map');
const _get = require('lodash/get');
const _find = require('lodash/find');
const _slice = require('lodash/slice');
const { getHttp } = require('../commons/http/htttpMethod');

const BASE_URL = 'https://api.mercadolibre.com';

class ItemsService {
  async readById(id) {
    const pathItem = `${BASE_URL}/items/${id}`;
    const pathDesc = `${pathItem}/description`;
    const resItem = await getHttp(pathItem);
    const resDesc = await getHttp(pathDesc);
    const dataItem = resItem.data;
    const categoryID = dataItem.category_id;
    const pathCategories = `${BASE_URL}/categories/${categoryID}`;
    const resCategories = await getHttp(pathCategories);
    const description = _get(resDesc, 'data.plain_text');
    const categories = resCategories.data;
    const resultAuthor = this._getAthor();
    const resultData = this._getItem(dataItem, description, categories);
    return {
      author: resultAuthor,
      item: resultData,
    };
  }

  async readAll(query) {
    const path = `${BASE_URL}/sites/MLA/search?`;
    const { data } = await getHttp(path, { q: query, limit: 4 });
    const { results, filters } = data;
    const resultsItems = this._getItems(results);
    const resultAuthor = this._getAthor();
    const resultsCategories = this._getCategories(filters);
    return {
      author: resultAuthor,
      categories: resultsCategories,
      items: resultsItems,
    };
  }

  _getAthor() {
    return {
      name: 'David',
      lastname: 'Castrillón',
    };
  }

  _getCategories(filters) {
    const categoryFinder = _find(filters, element => element.id === 'category');
    const pathFromRoot = _get(categoryFinder, 'values[0].path_from_root', []);
    return pathFromRoot;
  }

  _getItems(results) {
    const resultsSlice = _slice(results, 0, 4);
    return _map(resultsSlice, (item) => {
      const id = _get(item, 'id', '');
      const title = _get(item, 'title', '');
      const picture = _get(item, 'thumbnail', '');
      const condition = _get(item, 'condition', '');
      const freeShipping = _get(item, 'shipping.free_shipping', '');
      const currency = _get(item, 'currency_id');
      const price = _get(item, 'price', '');
      const amount = Math.trunc(price);
      const decimals = this._getDecimalFromPrice(price);
      const address = _get(item, 'address', {});
      return {
        id,
        title,
        picture,
        condition,
        free_shipping: freeShipping,
        price: {
          currency,
          amount,
          decimals,
        },
        address,
      };
    });
  }

  _getItem(item, description, categories) {
    const id = _get(item, 'id', '');
    const title = _get(item, 'title', '');
    const picture = _get(item, 'pictures[0].url', '');
    const condition = _get(item, 'condition', '');
    const freeShipping = _get(item, 'shipping.free_shipping', '');
    const currency = _get(item, 'currency_id');
    const price = _get(item, 'price', '');
    const amount = Math.trunc(price);
    const decimals = this._getDecimalFromPrice(price);
    const soldQuantity = _get(item, 'sold_quantity');
    const breadcrumb = _get(categories, 'path_from_root', []);
    return {
      id,
      title,
      picture,
      condition,
      free_shipping: freeShipping,
      price: {
        currency,
        amount,
        decimals,
      },
      sold_quantity: soldQuantity,
      description,
      categories: breadcrumb,
    };
  }

  _getDecimalFromPrice(amount) {
    return amount % 1 !== 0 ? parseInt(amount.toString().split('.')[1]) : 0;
  }
}

module.exports = ItemsService;
