define([
  'backbone.marionette',
  'hbs!tmpl/home',
  'kuiframe'
], 
  function(Marionette, Template) {
	  'use strict';
    return Backbone.Marionette.Layout.extend({
      template: Template,
      ui: {
        formUpload: "#form_upload"
      },
      
      events: {
        "submit #form_upload": "uploading"
      },
      
      onRender: function () {
        this.uploadFile = this.ui.formUpload.kuiframe({
          action: "http://karl.local:3000/api/upload_files",
          domain: "http://karl.local:3000",
          data: {
            key1: 123,
            key2: "val123",
            key3: true
          },
          success: function (data) {
            console.log(data);
          }
        });
      },
      
      
      uploading: function (event) {      
        this.uploadFile.update({
          data: {
            id: 800
          }
        })
      }
      
    });
  }
);