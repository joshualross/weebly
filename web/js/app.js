define([
    'jquery', 
    'underscore', 
    'backbone', 
    'router'
], function($, _, Backbone, Router) {
    var initialize = function() {
        Router.initialize();
        
        //here we add some droppable elements
        $('.droppable').droppable({
            accept: '.draggable', 
            drop: function(event, draggable){debugger;}
        });
    };

    return {
        initialize : initialize
    };
});