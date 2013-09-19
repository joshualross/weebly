// Filename: model/prediction
define([
    'underscore', 
    'backbone'
], function(_, Backbone) {
    var TemplateModel = Backbone.Model.extend({
        url: function() {
            return '/page/?id=' + this.id; 
        }
    });
    return TemplateModel;
});