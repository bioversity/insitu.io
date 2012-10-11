importPackage(com.google.appengine.api.images);

exports = images = {
  service: ImagesServiceFactory.getImagesService(),
  extractThumb: function(html) {
    if(!html) return false
    var matches = html.match('<img class="thumb-big" src="(.*)"/>')
    if(!matches.length) return false
    if(matches.length < 2) return false
    return matches[1]
  },
  getThumb: function(u) {
    var q = 'query='+u+'&results_needed=1&op=Get it!'
    var html = url.post('http://thumbtool.phpotdel.ru/', q)

    var thumb = images.extractThumb(html)

    return thumb
  },

  tests: {
    extractingThumbnail: function() {
       var thumbUrl = images.extractThumb('<div class="result-row "><div class="site-name">1.&nbsp;<a href="http://www.facebook.com/" rel="nofollow" title="Open http://www.facebook.com/">http://www.facebook.com/</a><a class="download-button" href="http://thumbtool.phpotdel.ru/adm-upload/87468c07c02e370ef84d4b7e3a66858913499457910.jpg" title="Download thumbnail for http://www.facebook.com/">Right-click me and select "Save as ..."!</a></div><br class="clear" /><div class="site-thumb"><img class="thumb-small" src="http://thumbtool.phpotdel.ru/adm-upload/87468c07c02e370ef84d4b7e3a66858913499457910small.jpg"/><img class="thumb-big" src="http://thumbtool.phpotdel.ru/adm-upload/87468c07c02e370ef84d4b7e3a66858913499457910.jpg"/><br /></div>')
      if(thumbUrl !== 'http://thumbtool.phpotdel.ru/adm-upload/87468c07c02e370ef84d4b7e3a66858913499457910.jpg') throw 'thumbnail extraction failed'
    },
    gettingThumb: function() {
      var thumbUrl = images.getThumb('http://google.com')
      if(!thumbUrl) throw 'failed getting thumb'
    },
    realSite: function() {
      var thumbUrl = images.getThumb('http://cnn.com')
      if(!thumbUrl) throw 'failed getting thumb'
    }
  }
}
