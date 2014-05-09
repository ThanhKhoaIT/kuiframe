var PryntexApp = PryntexApp || {};

define([
  'backbone.marionette',
  'views/home_view'
  
], function(Marionette, HomeView) {
	'use strict';
    return Backbone.Marionette.AppRouter.extend({
  	  el: '#body',
      routes: {
        '': 'home',
      },
      regions: {
        content: "#content"
      },
      
      home: function () {
        this.options.App.contentShow.show(new HomeView());
      }    
    }); 
  }
);