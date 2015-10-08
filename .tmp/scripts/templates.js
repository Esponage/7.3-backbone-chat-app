this["JST"] = this["JST"] || {};
this["JST"]["application"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<form>\n  <input class=\"username\" type=\"text\" value=\"\">\n  <input type=\"submit\">\n</form>\n";
},"useData":true});
this["JST"]["create"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "\n<input  class=\"user-style\" type=\"text\" name=\"username\" placeholder=\"username\">\n<textarea class=\"textarea-style\" type=\"text\" name=\"message\" placeholder=\"message\"></textarea>\n<input type=\"submit\" class=\"js-submit-post\">\n";
},"useData":true});
this["JST"]["index"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
},"useData":true});
this["JST"]["message"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "\n\n  <h4 class=\"name\">"
    + alias3(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"username","hash":{},"data":data}) : helper)))
    + "</h1>\n  <h2 class=\"post\">"
    + alias3(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"message","hash":{},"data":data}) : helper)))
    + "</h2>\n  <h6 class=\"time\">"
    + alias3(((helper = (helper = helpers.created_at || (depth0 != null ? depth0.created_at : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"created_at","hash":{},"data":data}) : helper)))
    + "\n";
},"useData":true});