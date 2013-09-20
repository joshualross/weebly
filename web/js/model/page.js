// Filename: model/page
define([
    'underscore', 
    'backbone'
], function(_, Backbone) {
    var PageModel = Backbone.Model.extend({
        url: function() {
            if (this.id)
                return '/page/?id=' + this.id;
            return '/page';
        }
    });
    return PageModel;
});