// Filename: model/prediction
define([
    'underscore', 
    'backbone'
], function(_, Backbone) {
    var PredictionModel = Backbone.Model.extend({
        url: function() {
            return '/';
        }
    });
    return PredictionModel;
});