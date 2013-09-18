// Filename: view/elements
define([
    'jquery', 
    'underscore', 
    'backbone',
    'collection/element',
    'text!/view/module/elements.hb'
], function($, _, Backbone, ElementCollection, template) {
    var ElementsView = Backbone.View.extend({
        el: $('#elements'),
        events: {
//            'click div': function(e){debugger;},
        },
        template: Handlebars.compile(template),
        render: function() {
            this.$el.html(this.template());
            $('#elements .draggable').draggable({revert: true});
        },
        initialize: function(options) {
            //add the droppable containers
        }
    });
    return ElementsView;
});