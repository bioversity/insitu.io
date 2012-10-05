var apejs = require('apejs.js')
var googlestore = require('googlestore.js')
var select = require('select.js')
var mustache = require('./common/mustache.js')
var gdrive = require('./gdrive.js')
var blobstore = require('./blobstore.js')
var blobService = blobstore.service
var blobInfoFactory = blobstore.blobInfoFactory

apejs.urls = {
  '/': {
    get: function(req, res) {
      var html = mustache.to_html(render('skins/index.html'), {}, {})
      print(res).html(html)
    }
  },

  '/fileupload': {
    get: function(req, res) {
      var html = mustache.to_html(render('skins/fileupload.html'), {}, {})
      print(res).html(html)
    }
  },
  '/get-files': {
    get: function(req, res) {
      var files = [];
      select('file')
        .find()
        .limit(10)
        .values(function(values) { files = values })

      print(res).json(files)
    }
  },
  /**
   * This service loads data from a Google Drive.
   * Shouldn't be a Public API
   */
  '/get-gdrive-files': {
    get: function(req, res) {
      var g = new gdrive
      print(res).html(g.createShortUrl())
    }
  },

  /**
   * REST API for fileupload
   */
  '/rest/file/url': {
    get: function(req, res) {
      var url = blobService.createUploadUrl("/rest/file")
      print(res).json(''+url)
    }
  },
  '/rest/file': {
    post: function(req, res) {
      var blobs = blobService.getUploadedBlobs(req)
      var blobKey = blobs.get('files[]')
      var blobKeyString = blobKey.getKeyString()

      // add it to datastore
      var e = googlestore.entity('file', {
        'blobKeyString': blobKeyString
      })
      googlestore.put(e)

      res.sendRedirect("/rest/file/" + blobKeyString + "/meta")
    }
  },
  '/rest/file/(.*)/meta': {
    get: function(req, res, matches) {
      var key = matches[1]
      var blobKey = new BlobKey(key)
      var info = blobInfoFactory.loadBlobInfo(blobKey);

      var ret = [{
        name: ''+info.getFilename(),
        size: ''+info.getSize(),
        url: "/rest/file/" + key
      }]
      print(res).json(ret)
    }
  },
  '/rest/file/(.*)': {
    get: function(req, res, matches) {
      var key = matches[1]
      var blobKey = new BlobKey(key)
      var blobInfo = blobInfoFactory.loadBlobInfo(blobKey)
      res.setHeader("Content-Disposition", "attachment; filename=" + blobInfo.getFilename())
      blobService.serve(blobKey, res)
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
