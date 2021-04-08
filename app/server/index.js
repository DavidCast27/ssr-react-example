
require('@babel/register');
require('@babel/polyfill');

require.extensions['.scss'] = () => {};

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const favicon = require('serve-favicon');
const path = require('path');
const axios = require('axios');

const template = require('./template');
const Home = require('../shared/pages/home');
const Vip = require('../shared/pages/vip');
const Search = require('../shared/pages/search');

const server = express();
const port = 3000;

const itemsRoutes = require('./routes/items.routes');

server.use('/', express.static(path.join(__dirname, '../../build')));
server.use('/static', express.static(path.join(__dirname, '../static')));
server.use(favicon(path.join(__dirname, '../static', 'favicon.ico')));

server.use('/api/items', itemsRoutes);


server.get('/', (req, res) => {
  res.send(template(
    'home',
    ReactDOMServer.renderToString(React.createElement(Home, {}, null)),
  ));
});

server.get('/items', async (req, res) => {
  try {
    const query = req.query.search;
    const props = {};
    const response = await axios.get('http://localhost:3000/api/items', { params: { q: query } });
    props.items = response.data.items;
    props.categories = response.data.categories;
    res.send(template(
      'search',
      ReactDOMServer.renderToString(React.createElement(Search, { ...props }, null)),
    ));
  } catch (error) {
    console.error(error);
  }
});

server.get('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const props = {};
    const response = await axios.get(`http://localhost:3000/api/items/${id}`);
    props.itemData = response.data;
    res.send(template(
      'vip',
      ReactDOMServer.renderToString(React.createElement(Vip, { ...props }, null)),
    ));
  } catch (error) {
    console.error(error);
  }
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
