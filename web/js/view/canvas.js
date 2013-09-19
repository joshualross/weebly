// Filename: view/canvas
define([
    'jquery', 
    'underscore', 
    'backbone',
    'text!/view/module/canvas.hb',
    'text!/view/module/partial/nav-page.hb'
], function($, _, Backbone, template, pageTemplate) {
    var CanvasView = Backbone.View.extend({
        el: $('#page'),
        events: {
        },
        template: Handlebars.compile(template),
        pageTemplate: Handlebars.compile(pageTemplate),
        render: function() {

            this.$el.html(this.template()); 
            $('.sortables').sortable({appendTo: '.sortables', items: 'div'});
         // here we add some droppable elements
//            $('.droppable').droppable({
//                accept : '.draggable',
//                drop : function(event, draggable) {
//                    
//                }
//            });
        },
        renderPages: function(collection) {
            $('#page nav').html(this.pageTemplate({pages: collection.toJSON()}));
            this.$el.find('nav div:first-child').addClass('selected');
        },
        initialize: function(options) {
            Backbone.pubSub.on('template-modify', this.renderPages, this);
        }
    });

    return CanvasView;
});