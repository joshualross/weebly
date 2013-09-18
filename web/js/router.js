// Filename: router.js
define([
    'jquery', 
    'underscore', 
    'backbone', 
    'view/app',
    'view/error'
], function($, _, Backbone, AppView, ErrorView) {
    var AppRouter = Backbone.Router.extend({
        routes : {
            // Define some URL routes
            '' : 'index',
            // Default
            '*actions' : 'defaultAction'
        }
    });
    var initialize = function(options) {
        var router = new AppRouter();
        router.on('route:index', function() {  
            var view = new AppView();
            view.render();
            
        });
        router.on('route:defaultAction', function(actions) {
            
            // We have no matching route, lets just log what the URL was
            console.log('No route:', actions);
        });
        Backbone.history.start();
        //navigate from a view
        Backbone.View.prototype.navigate = function(route) {
            return router.navigate(route, {trigger : true});
        };
    };
    return {
        initialize: initialize
    };
});