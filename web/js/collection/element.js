// Filename: collection/prediction
define([
    'underscore', 
    'backbone',
    'model/element'
], function(_, Backbone, ElementModel) {
    var ElementCollection = Backbone.Collection.extend({
        model : ElementModel,
        url : '/element/type',
        initialize : function(models, options) {
            this.fetch(this.url);
        }
    });
    return ElementCollection;
});