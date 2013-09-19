// Filename: view/prediction/list
define([
    'jquery', 
    'underscore', 
    'backbone',
    'view/elements',
    'view/templates',
    'view/settings',
    'text!/view/module/app.hb'
], function($, _, Backbone, ElementsView, TemplatesView, SettingsView, appTemplate) {
    var AppView = Backbone.View.extend({
        el: $('#application'),
        events: {
        },
        views: {  
        },
        template: Handlebars.compile(appTemplate),
        render: function() {
            this.$el.html(this.template()); 
            this.$el.promise().done(function(){
                _.each(this.views, function(view, index){
                    view.el = '#' + index; //update the element
                    view.$el = $('#' + index); //update the element
                    view.render();
                    view.delegateEvents(); //rebind events uggh
                });                
            }.bind(this));
            return this;
        },

        initialize: function(options) {
            //we have three views in this app
            this.views.templates = new TemplatesView();
            this.views.elements = new ElementsView();
            this.views.settings = new SettingsView();
        }
    });
    // Our module now returns our view
    return AppView;
});