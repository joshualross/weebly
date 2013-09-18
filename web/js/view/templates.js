// Filename: view/templates
define([
    'jquery', 
    'underscore', 
    'backbone',
    'text!/view/module/templates.hb'
], function($, _, Backbone, template) {
    var TemplatesView = Backbone.View.extend({
        el: $('#templates'),
        events: {
            'click .controls': 'modify',
            'blur .page input': 'disable'
        },
        template: Handlebars.compile(template),
        render: function() {
            this.$el.html(this.template());
        },
        modify: function(e) {
            //focus the input
            //
            var $target = $(e.target),
                $input = $(e.currentTarget).next('input');
            if ($target.hasClass('edit'))
                this.edit($input);
            else 
                this.remove($(e.currentTarget).parent('.page'));
        },
        edit: function($input) {
            $input.attr('disabled', false).focus();
        },
        remove: function($el) {
            if ($el.hasClass('confirm'))
                $el.remove();
            else
                $el.addClass('confirm');
        },
        disable: function(e) {
            $(e.target).attr('disabled', 'disabled');
        },
        initialize: function(options) {
            
        }
    });
    return TemplatesView;
});