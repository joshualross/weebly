// Filename: view/templates
define([
    'jquery', 
    'underscore', 
    'backbone',
    'text!/view/module/templates.hb'
], function($, _, Backbone, template) {
    var TemplatesView = Backbone.View.extend({
        el: $('#templates'),
        events: {
            'mouseover .page' : this.onDelete,
        },
        template: Handlebars.compile(template),
        render: function() {
            this.$el.html(this.template());
        },
        onDelete: function(e) {
            debugger;
        },
        initialize: function(options) {
            
        }
    });
    return TemplatesView;
});