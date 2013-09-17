// Filename: lib/handlebars/helper.js
define([
    'handlebars'
], function(Handlebars) {
    /**
     * Render a template inside the current template
     * {{{subtemplate template="templateName" otherData="foobar" moarData="foobaz"}}}
     * @return string
     */
    Handlebars.registerHelper('subtemplate', function(options) {
        var data = options.hash,
            subtemplate = data.template || '';

        if ('' != subtemplate) {
            return Handlebars.templates[subtemplate](data);
        }
    });
});
