// Filename: model/prediction
define([
    'underscore', 
    'backbone'
], function(_, Backbone) {
    var TemplateModel = Backbone.Model.extend({
        url: '/page/'
    });
    return TemplateModel;
});