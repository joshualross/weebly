define([
    'jquery', 
    'underscore', 
    'backbone',
    'router'
], function($, _, Backbone, Router) {
    var initialize = function() {
        Backbone.pubSub = _.extend({}, Backbone.Events);
        Router.initialize();
    }

    return {
        initialize : initialize
    };
});