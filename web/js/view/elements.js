// Filename: view/elements
define([
    'jquery', 
    'underscore', 
    'backbone',
    'collection/elementType',
    'text!/view/module/elements.hb'
], function($, _, Backbone, ElementCollection, template) {
    var ElementsView = Backbone.View.extend({
        el: $('#elements'),
        events: {
        },
        template: Handlebars.compile(template),
        render: function() {
            this.$el.html(this.template());
            $('#elements .draggable').draggable({revert: true});
        },
        initialize: function(options) {
            //add the droppable containers
            this.collection = new ElementTypeCollection([], {});
        }
    });
    return ElementsView;
});