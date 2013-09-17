// Filename: view/settings
define([
    'jquery', 
    'underscore', 
    'backbone',
    'text!/view/module/settings.hb'
], function($, _, Backbone, template) {
    var SettingsView = Backbone.View.extend({
        el: $('#settings'),
        events: {
        },
        template: Handlebars.compile(template),
        render: function() {
            this.$el.html(this.template());
        },
        initialize: function(options) {
        }
    });
    return SettingsView;
});