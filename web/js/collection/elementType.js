// Filename: collection/prediction
define([
    'underscore', 
    'backbone',
    'model/elementType'
], function(_, Backbone, ElementTypeModel) {
    var ElementTypeCollection = Backbone.Collection.extend({
        model : ElementTypeModel,
        url : '/element/type',
        initialize : function(models, options) {
        }
    });
    return ElementTypeCollection;
});