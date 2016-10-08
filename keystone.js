// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
// require('dotenv').config();
import * as config from './env.json';
// Require keystone
import keystone from 'keystone';
import handlebars from 'express-handlebars';

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'Universal Keystone',
	'brand': 'Universal Keystone',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'server/templates/views',
	'view engine': 'hbs',

	'custom engine': handlebars.create({
		layoutsDir: 'server/templates/views/layouts',
		partialsDir: 'server/templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./server/templates/views/helpers')(),
		extname: '.hbs',
	}).engine,

	'emails': 'templates/emails',
	//TODO: the next two lines should be replaced some time soon
	'cloudinary config':  { cloud_name: 'my-cloud', api_key: 'abc', api_secret: '123' },
	'cookie secret': 'a big secret',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});

// Load your project's Models
keystone.import('server/models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./server/routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.
keystone.set('email locals', {
	logo_src: '/images/logo-email.gif',
	logo_width: 194,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#2697de',
		buttons: {
			color: '#fff',
			background_color: '#2697de',
			border_color: '#1a7cb7',
		},
	},
});

// Load your project's email test routes
keystone.set('email tests', require('./server/routes/emails'));


// Switch Keystone Email defaults to handlebars
keystone.Email.defaults.templateExt = 'hbs';
keystone.Email.defaults.templateEngine = require('handlebars');


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	enquiries: 'enquiries',
	users: 'users',
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
