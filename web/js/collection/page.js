// Filename: collection/page
define([
    'underscore', 
    'backbone',
    'model/page'
], function(_, Backbone, PageModel) {
    var PageCollection = Backbone.Collection.extend({
        model : PageModel,
        url : '/page/',
        initialize : function(models, options) {
        }
    });
    return PageCollection;
});