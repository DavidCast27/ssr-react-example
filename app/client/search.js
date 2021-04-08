const React = require('react');
const ReactDOM = require('react-dom');
const Search = require('../shared/pages/search');
require('../shared/pages/search.scss');

const preloadedState = window.ML_PRELOADED_STATE;

ReactDOM.hydrate(<Search {...preloadedState} />, document.getElementById('root'));
