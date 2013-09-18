// Filename: model/prediction
define([
    'underscore', 
    'backbone'
], function(_, Backbone) {
    var ElementModel = Backbone.Model.extend({
        url: function() {
            return '/element/type';
        }
    });
    return ElementModel;
});