// Filename: collection/prediction
define([
    'underscore', 
    'backbone',
    'model/prediction'
], function(_, Backbone, PredictionModel) {
    var PredictionCollection = Backbone.Collection.extend((function() {
        var position;
        return {
            model : PredictionModel,
            url : function() {
                if (typeof position != 'undefined')
                    return '/prediction/' + position.coords.latitude + '/' + position.coords.longitude;
            },
            initialize : function(models, options) {
                position = options.position;
                this.fetch(this.url);
            }
        };
    })());
    return PredictionCollection;
});