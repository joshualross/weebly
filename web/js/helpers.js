// Filename: lib/handlebars/helper.js
define([
    'jquery',
    'handlebars',
    'text!/view/module/partial/control-page.hb', 
    'text!/view/module/partial/element-type.hb', 
    'text!/view/module/partial/element.hb', 
    'text!/view/module/partial/imageFill.hb', 
    'text!/view/module/partial/titleFill.hb', 
    'text!/view/module/partial/textFill.hb', 
], function($, Handlebars, controlPage, elementType, element, imageFill, titleFill, textFill) {
    
    var partial = Handlebars.compile(controlPage);
    Handlebars.registerPartial('controlPage', partial);
    
    var partial = Handlebars.compile(elementType);
    Handlebars.registerPartial('elementType', partial);

    var partial = Handlebars.compile(element);
    Handlebars.registerPartial('element', partial);
    
    var imageFillTemplate = Handlebars.compile(imageFill),
        titleFillTemplate  = Handlebars.compile(titleFill),
        textFillTemplate  = Handlebars.compile(textFill);
    Handlebars.registerHelper("fillContent", function() {
        if (!this.content)
        {
            switch (parseInt(this.type)) {
                case 1:
                    return titleFillTemplate();
                    break;
                case 2:
                    return textFillTemplate();
                    break;
                case 3:
                    return imageFillTemplate();
                    break;
                case 4:
                default:
                    //do nothing for nav's
                    break;
            }
        }
        return this.content;
    });
    
    
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
