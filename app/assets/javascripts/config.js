require.config({
    deps: ['app/main'],
	paths : {
		lib : 'lib',
		jquery : '/assets/jquery',
		backbone : 'lib/backbone-min',
		underscore : 'lib/underscore-min',
		models: 'app/models',
		collections: 'app/collections',
		views: 'app/views'
	},
	shim : {
		underscore : {
			exports : '_'
		},
		backbone : {
			deps : ['underscore', 'jquery'],
			exports : 'Backbone'
		}
	}
});
