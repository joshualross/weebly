require.config({
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery', 'handlebars'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'handlebars': {
            exports: 'Handlebars'
        }
    },
    paths : {
        jquery : 'lib/jquery/jquery-2.0.3.min',
        underscore : 'lib/underscore/underscore-min',
        backbone : 'lib/backbone/backbone-min',
        handlebars : 'lib/handlebars/handlebars'
    }  
});

require(['app'], function(App) {
    App.initialize();
});
require(['helpers'], function(){});