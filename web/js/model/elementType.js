// Filename: model/prediction
define([
    'underscore', 
    'backbone'
], function(_, Backbone) {
    var ElementTypeModel = Backbone.Model.extend({
        url: function() {
            return '/element/type';
        }
    });
    return ElementTypeModel;
});