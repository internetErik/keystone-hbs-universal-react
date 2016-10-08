import React from 'react';
import Route from 'react-router';
import ReactDOM from 'react-dom';
import HomePage from '../both/react/pages/HomePage.jsx';

var props = window.PROPS;

ReactDOM.render(
  <HomePage {...props} />, document.getElementById('app')
);