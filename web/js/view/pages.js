// Filename: view/pages
define([
    'jquery', 
    'underscore', 
    'backbone', 
    'model/page',
    'collection/page',
    'text!/view/module/pages.hb'   
], function($, _, Backbone, PageModel, PageCollection, template) {
    var PagesView = Backbone.View.extend({
        el : $('#pages'),
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
            Backbone.pubSub.trigger('page-update', this.collection);
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
                Backbone.pubSub.trigger('page-update', this.collection);
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
            
            //there is more to do here, we need to know if this 
            //is the selected page, and then if they edit/delete the 
            //selected page, we have to update and reroute to the next page
            //for now, we will just select the first one 
            $('#pages .selected');
            
            $parent.slideUp(300, function() {$(this).remove();});
            Backbone.pubSub.trigger('page-update', this.collection);
        },
        confirm : function(e) {
            $(e.currentTarget).parent().parent('.page').addClass('confirm');
        },
        disable : function(e) {
            var $target = $(e.target),
                $parent = $(e.target).parent('.page'),
                id = $parent.data('id');
            
            if (id) { //we modified an existing model
                var model = this.collection.get($parent.data('id'));
                model.set('name', $target.val());
                model.save();
                Backbone.pubSub.trigger('page-update', this.collection);
            }
                
            $target.attr('disabled', 'disabled');
        },
        addKeyup: function(e) {
            var $target = $(e.target),
                value = $target.val();

            if (value != this.defaultText)
                $target.val(value.replace(this.defaultText, ''));
            else if (value == '')
                $target.val(this.defaultText);
        },
        refreshRequest: function() {
            Backbone.pubSub.trigger('page-update', this.collection);
        },
        refreshCurrent: function() {
            //basically, tell us which page is the current one
            Backbone.pubSub.trigger('page-current', $('#pages .selected').data('id'));
        },
        initialize : function(options) {
            this.collection = new PageCollection([], {});
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
            Backbone.pubSub.on('page-refresh-request', this.refreshRequest, this);
        }
    });
    return PagesView;
});