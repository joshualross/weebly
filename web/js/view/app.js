// Filename: view/prediction/list
define([
    'jquery', 
    'underscore', 
    'backbone',
    'text!/view/module/app.hb'
], function($, _, Backbone, appTemplate) {
    var AppView = Backbone.View.extend({
        el: $('#application'),
        events: {
        },
        template: Handlebars.compile(appTemplate),
        render: function() {
            this.$el.html(this.template());
        },
        initialize: function(options) {
            
        }
    });
    // Our module now returns our view
    return AppView;
});