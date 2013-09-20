// Filename: collection/prediction
define([
    'underscore', 
    'backbone',
    'model/element'
], function(_, Backbone, ElementModel) {
    var ElementCollection = Backbone.Collection.extend({
        model : ElementModel,
        url : '/element',
        initialize : function(models, options) {
        }
    });
    return ElementCollection;
});