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

            //refresh the navigation
            Backbone.pubSub.trigger('page-refresh-request');
        },
        edit: function(e) {
           $('.element').removeClass('edit');
           $(e.currentTarget).addClass('edit');
        },
        confirm: function(e) {
            var $parent = $(e.currentTarget).parent().parent('.element');
            
            //prevent the only nav from being deleted
            if ($parent.hasClass('type-4') && $('.element.type-4').length == 1) {
                alert('Can\'t delete me, need at least one nav');
                return;
            }
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
            //when the routing is done, we can get this from the page state
            var page = $('.type-4 .button.selected').data('id');
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