// Filename: model/prediction
define([
    'underscore', 
    'backbone'
], function(_, Backbone) {
    var ElementModel = Backbone.Model.extend({
        url: function() {
            return '/element/?id=' + this.id;
        }
    });
    return ElementModel;
});