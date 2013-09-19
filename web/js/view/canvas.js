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
        addPage: function(data) {
            $('#page nav').append(this.pageTemplate(data));
        },
        removePage: function(data) {
            var $page = $('#page nav .button').filter(function(index, el) {
                if (data.value == $(el).text() && data.position == $(el).data('position'))
                    return true;
                return false;
            });
            $page.fadeOut(300, function() { $(this).remove(); });
        },
        editPage: function(data) {
            var $page = $('#page nav .button').filter(function(index, el) {
                if (data.position == $(el).data('position'))
                    return true;
                return false;
            });
            
            $page.html(data.value);
        },
        initialize: function(options) {
            Backbone.pubSub.on('template-add', this.addPage, this);
            Backbone.pubSub.on('template-remove', this.removePage, this);
            Backbone.pubSub.on('template-edit', this.editPage, this);
        }
    });

    return CanvasView;
});