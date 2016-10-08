import keystone from 'keystone';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../../../both/routes';
exports = module.exports = function (req, res) {
  
  var props = { title: 'Universal React' };

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error)
      res.status(500).send(err.message);
    else if (redirectLocation)
      res.redirect(redirect.pathname + redirect.search);
    else if(renderProps) {
      const html = renderToString(<RouterContext {...renderProps} />);
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
    else
      res.status(404).send('Not Found');
  });
};
