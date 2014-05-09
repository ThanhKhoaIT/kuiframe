define([
	'backbone',
	'communicator',
  'router'
],

function( Backbone, Communicator, AppRouter ) {
    'use strict';

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
	  contentShow: "#content"
	});

	/* Add initializers here */
	App.addInitializer( function () {
		//document.body.innerHTML = welcomeTmpl({ success: "CONGRATS!" });
		Communicator.mediator.trigger("APP:START");
    new AppRouter({ App: this });
    Backbone.history.start({pushState: false});
	});
  
  App.start();
	return App;
});
