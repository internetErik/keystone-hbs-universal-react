import React from 'react';
import {Route, DefaultRoute} from 'react-router';
import Root from './components/app';
var HomeIndex =  require('./components/home/index');

export default (
  <Route path='/' handler={App}>
    <DefaultRoute handler={HomeIndex} />
  </Route>
);