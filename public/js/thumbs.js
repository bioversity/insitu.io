var thumbs = {
  init: function() {
    $.getJSON('/get-serving-urls', function(data) {
      for(var i in data) {
        var $thumbs = $('.thumbs')
        $thumbs.append('<img src="'+data[i]+'=s250-c" />')
      }
    })
  }
}
