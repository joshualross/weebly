// Filename: collection/prediction
define([
    'underscore', 
    'backbone',
    'model/template'
], function(_, Backbone, TemplateModel) {
    var TemplateCollection = Backbone.Collection.extend({
        model : TemplateModel,
        url : '/page/',
        initialize : function(models, options) {
        }
    });
    return TemplateCollection;
});