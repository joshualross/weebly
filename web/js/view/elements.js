// Filename: view/elements
define([
    'jquery', 
    'underscore', 
    'backbone',
    'text!/view/module/elements.hb'
], function($, _, Backbone, template) {
    var ElementsView = Backbone.View.extend({
        el: $('#elements'),
        events: {
        },
        template: Handlebars.compile(template),
        render: function() {
            this.$el.html(this.template());
        },
        initialize: function(options) {
        }
    });
    return ElementsView;
});