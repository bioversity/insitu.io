var apejs = require("apejs.js");

var mustache = require("./common/mustache.js");

apejs.urls = {
    "/": {
        get: function(req, res) {
            print(res).text('Hello World')
        }
    }
};

// simple syntax sugar
function print(response) {
    return {
        text: function(text) {
            if(text) response.getWriter().println(text);
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
