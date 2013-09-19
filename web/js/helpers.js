// Filename: lib/handlebars/helper.js
define([
    'jquery',
    'handlebars',
    'text!/view/module/partial/template-page.hb', 
    'text!/view/module/partial/element-type.hb', 
], function($, Handlebars, templatePage, elementType) {
    
    var partial = Handlebars.compile(templatePage);
    Handlebars.registerPartial('templatePage', partial);
    
    var partial = Handlebars.compile(elementType);
    Handlebars.registerPartial('elementType', partial);
    
    Handlebars.registerHelper("debug", function(optionalValue) {
        console.log("Current Context");
        console.log("====================");
        console.log(this);
       
        if (optionalValue) {
          console.log("Value");
          console.log("====================");
          console.log(optionalValue);
        }
      });
    
    $.fn.setCursorPosition = function(pos) {
        this.each(function(index, elem) {
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        });
        return this;
    };
});
