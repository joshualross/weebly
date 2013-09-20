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
            'click .confirm .delete': 'remove',
            'click .delete': 'confirm',
            'click .element': 'edit' 
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
                var html = $(this).find('> div').html(),
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
            });

            //refresh the navigation
            Backbone.pubSub.trigger('page-refresh-request');
        },
        edit: function(e) {
           $('.element').removeClass('edit');
           $(e.currentTarget).addClass('edit');
        },
        confirm: function(e) {
            //add a class to the element for deleting etc
            $(e.currentTarget).parent().parent('.element').addClass('confirm');
        },
        remove: function(e) {
            //get the data id
            var $parent = $(e.currentTarget).parent().parent('.element'),
                model = this.collection.get($parent.data('id'));
            
            model.destroy();
            $parent.slideUp(300, function() {$(this).remove();});
        },
        renderPages: function(collection) {
            $('.type-4 .content').html(this.pageTemplate({pages: collection.toJSON()}));
            this.$el.find('.type-4 div:first-child').addClass('selected');
        },
        elementAdd: function(data) {
            //get the selected page
            var page = $('.type-4 .selected').data('id');
            //add to the collection
            this.collection.create({'type': data.type, 'page': page});

        },
        initialize: function(options) {

            this.collection = new ElementCollection([], {});
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
            
            Backbone.pubSub.on('page-update', this.renderPages, this);
            Backbone.pubSub.on('element-add', this.elementAdd, this);
        }
    });

    return CanvasView;
});