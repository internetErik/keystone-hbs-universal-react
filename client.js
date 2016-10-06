var React = require('react');
var Route = require('react-router');
var ReactDOM = require('react-dom');
var Root = require('./templates/react/Root.jsx');

var props = window.PROPS;

ReactDOM.render(
  React.createElement(Root, props), document.getElementById('app')
);