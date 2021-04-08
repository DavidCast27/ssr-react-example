const React = require('react');
const ReactDOM = require('react-dom');
const Vip = require('../shared/pages/vip');
require('../shared/pages/vip.scss');

const preloadedState = window.ML_PRELOADED_STATE;

ReactDOM.hydrate(<Vip {...preloadedState} />, document.getElementById('root'));
