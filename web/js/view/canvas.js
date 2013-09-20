// Filename: view/canvas
define([
    'jquery', 
    'underscore', 
    'backbone',
    'collection/element',
    'text!/view/module/canvas.hb',
    'text!/view/module/partial/nav-page.hb'
], function($, _, Backbone, ElementCollection, template, pageTemplate) {
    var CanvasView = Backbone.View.extend({
        el: $('#page'),
        events: {
        },
        template: Handlebars.compile(template),
        pageTemplate: Handlebars.compile(pageTemplate),
        render: function() {

            this.$el.html(this.template({elements: this.collection.toJSON()})); 
//            $('.sortables').sortable({
//                appendTo: '.sortables', 
//                items: 'div',
//                placeholder: 'highlight',
////                receive: function(e, ui) {debugger;},
//            });
         // here we add some droppable elements
//            $('.droppable').droppable({
//                accept : '.draggable',
//                drop : function(event, draggable) {
//                    
//                }
//            });
            $('.sortables').each(function() {
                var html = $(this).child('div').html(),
                    type = $(this).data('type');
                //if the text is empty, add text
                if ('' == html)
                {
//@todo fill in the data if there is no content
                    switch (type)
                    {
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                    }
                        
                }
                debugger;
            })
        },
        receive: function(e, ui) {
            debugger;
        },
        renderPages: function(collection) {
            $('.type-4').html(this.pageTemplate({pages: collection.toJSON()}));
            this.$el.find('.type-4 div:first-child').addClass('selected');
        },
        initialize: function(options) {
            
//a nav has a set of pages, so for every nav element render all pages
            
            this.collection = new ElementCollection([], {});
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
            Backbone.pubSub.on('template-modify', this.renderPages, this);
            Backbone.pubSub.on('element-add', this.updateElements, this);
        }
    });

    return CanvasView;
});