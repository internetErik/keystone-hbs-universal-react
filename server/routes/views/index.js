import keystone from 'keystone';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../../../both/routes';
import reducers from '../../../both/reducers';
import {
  ReduxAsyncConnect,
  loadOnServer,
} from 'redux-connect';
import populateData from '../../data';

exports = module.exports = function (req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error)
      res.status(500).send(err.message);
    else if (redirectLocation)
      res.redirect(redirect.pathname + redirect.search);
    else if(renderProps) {
      // initialize a store for rendering app
      const store = createStore(reducers);
      // load data out of keystone's interface to mongo
      populateData(req.url).then((data) => {
        // wait for all components to finish async requests
        loadOnServer({...renderProps, store, data}).then(() => {
          const html = renderToString(
              <Provider store={store}>
                <ReduxAsyncConnect {...renderProps} />
              </Provider>
            );
          const view = new keystone.View(req, res);
          const locals = res.locals;
          locals.html = html;
          locals.props = JSON.stringify(store);

          // locals.section is used to set the currently selected
          // item in the header navigation.
          locals.section = 'home';

          // Render the view
          view.render('index');
        });
      });
    }
    else
      res.status(404).send('Not Found');
  });
};
