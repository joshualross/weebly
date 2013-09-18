// Filename: view/templates
define([
    'jquery', 
    'underscore', 
    'backbone', 
    'text!/view/module/templates.hb',
    'text!/view/module/page.hb',    
], function($, _, Backbone, template, subtemplate) {
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
            'keyup .page.add input' : 'keyup'
        },
        template : Handlebars.compile(template),
        subtemplate: Handlebars.compile(subtemplate),
        render : function() {
            this.$el.html(this.template());
        },
        add: function(e) {
            // focus input
            var $input = $(e.currentTarget).children('input');            
            $input.attr('disabled', false).focus();
            if ($input.val() == this.defaultText)
                $input.setCursorPosition(0);
            
        },
        append: function(e) {
            var $parent = $(e.currentTarget).parent().parent('.page'),
                $input = $parent.children('input');  
            if ($input.val() != this.defaultText) {
                $(this.subtemplate({'value': $input.val()}))
                    .insertBefore($parent);
                $input.val(this.defaultText);
            }
        },
        edit : function(e) {
            $(e.currentTarget).parent().next('input').attr('disabled', false)
                .focus();
        },
        remove : function(e) {
            $(e.currentTarget).parent().parent('.page').remove();
        },
        confirm : function(e) {
            $(e.currentTarget).parent().parent('.page').addClass('confirm');
        },
        disable : function(e) {
            $(e.target).attr('disabled', 'disabled');
        },
        keyup: function(e) {
            //if the input value doesn't match the default, remove the default
            //else if its empty, add the default
            var $target = $(e.target),
                value = $target.val();

            if (value != this.defaultText)
                $target.val(value.replace(this.defaultText, ''));
            else if (value == '')
                $target.val(this.defaultText);
        },
        initialize : function(options) {
        }
    });
    return TemplatesView;
});