import React from 'react';
import { 
  Route, 
  IndexRoute, 
} from 'react-router';

import App from './react/app';
import HomePage from './react/pages/HomePage';
import AboutPage from './react/pages/AboutPage';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='/about' component={AboutPage} />
  </Route>
);