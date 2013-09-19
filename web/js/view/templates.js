// Filename: view/templates
define([
    'jquery', 
    'underscore', 
    'backbone', 
    'model/template',
    'collection/template',
    'text!/view/module/templates.hb',
    'text!/view/module/partial/template-page.hb',    
], function($, _, Backbone, TemplateModel, TemplateCollection, template, subtemplate) {
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
        position: 1,
        template : Handlebars.compile(template),
        subtemplate: Handlebars.compile(subtemplate),
        render : function() {
            this.$el.html(this.template({'position': this.position}));
            ++this.position;
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
                $(this.subtemplate({'value': value, 'position': ++this.position}))
                    .insertBefore($parent);                
                $input.val(this.defaultText);
                
                var model = new TemplateModel({'position': this.position, 'name': value});
                model.save();
                this.collection.add(model);
                debugger;
                Backbone.pubSub.trigger('template-add', {'value': value, 'position': this.position});
            }
        },
        edit : function(e) {
            $(e.currentTarget).parent().next('input')
                .attr('disabled', false)
                .focus();
        },
        remove : function(e) {
            var $parent = $(e.currentTarget).parent().parent('.page'),
                value = $parent.children('input').val(),
                position = $parent.data('position');

            $parent.slideUp(300, function() {$(this).remove();});
            Backbone.pubSub.trigger('template-remove', {'value':value, 'position':position});
        },
        confirm : function(e) {
            $(e.currentTarget).parent().parent('.page').addClass('confirm');
        },
        disable : function(e) {
            var $target = $(e.target),
                $parent = $(e.target).parent('.page'),
                value = $target.val(),
                position = $parent.data('position');
            
            $target.attr('disabled', 'disabled');
            Backbone.pubSub.trigger('template-edit', {'value': value, 'position': position});
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
        }
    });
    return TemplatesView;
});