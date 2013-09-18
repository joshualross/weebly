require.config({
    shim: {
        'jquery-ui': {
            deps: ['jquery']
        },  
        'backbone': {
            deps: ['underscore', 'jquery', 'jqueryui', 'handlebars'],
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
        jqueryui : 'lib/jquery/jquery-ui-1.10.3.custom',
        underscore : 'lib/underscore/underscore-min',
        backbone : 'lib/backbone/backbone-min',
        handlebars : 'lib/handlebars/handlebars'
    }  
});

require(['app'], function(App) {
    App.initialize();
});
require(['helpers'], function(){});