// Filename: view/elementTypes
define([
    'jquery', 
    'underscore', 
    'backbone',
    'collection/elementType',
    'text!/view/module/elementTypes.hb'
], function($, _, Backbone, ElementTypeCollection, template) {
    var ElementTypesView = Backbone.View.extend({
        el: $('#elements'),
        events: {
            'click .draggable': 'drop'
        },
        template: Handlebars.compile(template),
        render: function() {
            this.$el.html(this.template({types: this.collection.toJSON()}));
        },
        drop: function(e) {
            var type = $(e.currentTarget).data('id');
            Backbone.pubSub.trigger('element-add',{
                'type': type, 
                'collection': this.collection
            });
        },
        initialize: function(options) {
            //add the droppable containers
            this.collection = new ElementTypeCollection([], {});
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        }
    });
    return ElementTypesView;
});