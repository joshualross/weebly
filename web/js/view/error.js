// Filename: view/error
define([
    'jquery', 
    'underscore', 
    'backbone',
    'text!/view/module/error.hb'
], function($, _, Backbone, errorTemplate) {
    var errorView = Backbone.View.extend({
        el: $('#predictions'),
        template: Handlebars.compile(errorTemplate),
        render: function() {
            this.$el.html(this. template());
        }
    });
    return errorView;
});