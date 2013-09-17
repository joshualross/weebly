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
            _.each(this.views, function(view){
                this.$el.append(view.template());
            }.bind(this));
            return this;
        },
        initialize: function(options) {
            this.on('render', this.afterRender);
            //we have three views in this app
            this.views.templates = new TemplatesView();
            this.views.elements = new ElementsView();
            this.views.settings = new SettingsView();
        }
    });
    // Our module now returns our view
    return AppView;
});