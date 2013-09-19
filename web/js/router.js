// Filename: router.js
define([
    'jquery', 
    'underscore', 
    'backbone', 
    'view/app',
    'view/canvas',
    'view/error'
], function($, _, Backbone, AppView, CanvasView, ErrorView) {
    var AppRouter = Backbone.Router.extend({
        routes : {
            '' : 'index',
            '*actions' : 'defaultAction'
        }
    });
    var initialize = function(options) {
        var router = new AppRouter();
        router.on('route:index', function() {  
            var view = new AppView();
            view.render();
            
            var canvas = new CanvasView();
            canvas.render();
            
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