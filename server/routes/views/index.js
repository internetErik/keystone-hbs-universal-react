import keystone from 'keystone';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, Router, Route, RouterContext, browserHistory } from 'react-router';
import HomePage from '../../../both/react/pages/HomePage.jsx';

exports = module.exports = function (req, res) {
  
  var props = { title: 'Universal React' };

  match({
    routes: (
      <Router history={browserHistory}>
        <Route path='/' component={HomePage}>
        </Route>
      </Router>
    ),
    location: req.url
  }, function(error, redirectLocation, renderProps) {
    if(renderProps) {
      var html = ReactDOMServer.renderToString(
        <RouterContext
          {...renderProps}
          createElement={function (Document, renderProps){
            return <Document {...renderProps} {...props} />;
          }}
        />
      );
      // console.log(html);
      // res.send(html);

      var view = new keystone.View(req, res);
      var locals = res.locals;
      locals.html = html;
      locals.props = JSON.stringify(props);

      // locals.section is used to set the currently selected
      // item in the header navigation.
      locals.section = 'home';

      // Render the view
      view.render('index');
    }
    else {
      res.status(404).send('Not Found');
    }
  });
};
