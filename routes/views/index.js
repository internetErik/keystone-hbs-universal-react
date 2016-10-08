var keystone = require('keystone');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var ReactRouter = require('react-router');
var Root = require('../../templates/react/Root.jsx');
exports = module.exports = function (req, res) {
  
  var props = { title: 'Universal React' };

  ReactRouter.match({
    routes: (
      <ReactRouter.Router history={ReactRouter.browserHistory}>
        <ReactRouter.Route path='/' component={Root}>
        </ReactRouter.Route>
      </ReactRouter.Router>
    ),
    location: req.url
  }, function(error, redirectLocation, renderProps) {
    if(renderProps) {
      var html = ReactDOMServer.renderToString(
        <ReactRouter.RouterContext
          {...renderProps}
          createElement={function(Document, renderProps) {
            return <Component {...renderProps} {...props} />;
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
