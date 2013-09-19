// Filename: view/templates
define([
    'jquery', 
    'underscore', 
    'backbone', 
    'model/template',
    'collection/template',
    'text!/view/module/templates.hb'   
], function($, _, Backbone, TemplateModel, TemplateCollection, template) {
    var TemplatesView = Backbone.View.extend({
        el : $('#templates'),
        defaultText: 'Add New Page',
        events : {
            'click .edit' : 'edit',
            'click .confirm .delete' : 'remove',
            'click .delete' : 'confirm',
            'click .page.add .add' : 'append',
            'click .page.add' : 'add',
            'blur .page input' : 'disable',
            'keyup .page.add input' : 'addKeyup'
        },
        template : Handlebars.compile(template),
        render : function() {
            this.$el.html(this.template({pages: this.collection.toJSON()}));
            this.$el.find('.page:first-child').addClass('selected');
            Backbone.pubSub.trigger('template-modify', this.collection);

        },
        add: function(e) {
            var $input = $(e.currentTarget).children('input');            
            $input.attr('disabled', false).focus();
            if ($input.val() == this.defaultText)
                $input.setCursorPosition(0);
            
        },
        append: function(e) {
            var $parent = $(e.currentTarget).parent().parent('.page'),
                $input = $parent.children('input'),
                value = $input.val();
            if (value != this.defaultText) {
                this.collection.create({'name': value});
                $input.val(this.defaultText);

                Backbone.pubSub.trigger('template-modify', this.collection);
            }
        },
        edit : function(e) {
            $(e.currentTarget).parent().next('input')
                .attr('disabled', false)
                .focus();
        },
        remove : function(e) {
            var $parent = $(e.currentTarget).parent().parent('.page'),
                model = this.collection.get($parent.data('id'));

            model.destroy();
            $parent.slideUp(300, function() {$(this).remove();});
            Backbone.pubSub.trigger('template-modify', this.collection);
        },
        confirm : function(e) {
            $(e.currentTarget).parent().parent('.page').addClass('confirm');
        },
        disable : function(e) {
            var $target = $(e.target),
                $parent = $(e.target).parent('.page'),
                model = this.collection.get($parent.data('id'));;
            
            model.set('name', $target.val());
            model.save();
                
            $target.attr('disabled', 'disabled');
            Backbone.pubSub.trigger('template-modify', this.collection);
        },
        addKeyup: function(e) {
            var $target = $(e.target),
                value = $target.val();

            if (value != this.defaultText)
                $target.val(value.replace(this.defaultText, ''));
            else if (value == '')
                $target.val(this.defaultText);
        }, 
        initialize : function(options) {
            this.collection = new TemplateCollection([], {});
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        }
    });
    return TemplatesView;
});