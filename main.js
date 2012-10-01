var apejs = require("apejs.js");

var mustache = require("./common/mustache.js");

apejs.urls = {
    "/": {
        get: function(req, res) {
            var html = mustache.to_html(render("skins/index.html"), {}, {})
            print(res).html(html)
        }
    }
};

// simple syntax sugar
function print(response) {
    response.setCharacterEncoding("UTF-8");
    return {
        html: function(html) {
            if(response == null) return;
            response.setContentType("text/html");
            response.getWriter().println(html);
        },
        json: function(j) {
            if(response == null) return;
            var jsonString = JSON.stringify(j);
            response.setContentType("application/json");
            response.getWriter().println(jsonString);
        }
    };
}
function param(request) {
    return function(par) {
        var p = request.getParameter(par);
        if(p) return p;
        else return false;
    }
}
