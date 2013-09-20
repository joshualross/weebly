// Filename: model/element
define([
    'underscore', 
    'backbone'
], function(_, Backbone) {
    var ElementModel = Backbone.Model.extend({
        url: function() {
            if (this.id)
                return '/element/?id=' + this.id;
            return '/element';
        }
    });
    return ElementModel;
});