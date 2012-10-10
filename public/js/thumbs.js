var thumbs = {
  cont: null, // container
  addThumb: function(src, prepend) {
    var $div = $('<div class="thumb"></div>')
    $div.css({
      width: 250,
      height: 250,
      background: 'url('+src+') no-repeat center center'
    })
    $div.append('<div class="block">Ciao Pippa</div>')
    if(prepend) {
      thumbs.cont.prepend($div)
    } else {
      thumbs.cont.append($div)
    }
    function load() {
      var $this = $(this)
      $this.fadeIn()
      $this.animate({
        zoom: 1,
        opacity: 1
      }, 300, function(){
      })
    }
    //if(src) $img.load(load)
    return $div
  },
  removePreview: function(end) {
    $('.preview').animate({
      opacity: 0
    }, function() {
      $(this).remove()
    })
  },
  addPreview: function() {
    var $div = $('<div class="thumb"></div>')
    $div.css({
      width: 250,
      height: 250
    })
    $div.addClass('preview')
    $div.css({
      background: '#F4F886'
    })
    thumbs.cont.prepend($div)
  },
  preview: function(i, file) {
		var reader = new FileReader();

		
    (function(i) {
      reader.onload = function(e){
        var thumbnail = false;
        // e.target.result holds the DataURL which
        // can be used as a source of the image:
        if(i === 0) { // use the existing yellow preview thumb
          var $div = $('.preview')
          if(!$div.length) { // means we're uploading through regular
            thumbnail = thumbs.addThumb(e.target.result, true)
          } else {
            thumbnail = thumbs.addThumbPreview($div, e.target.result)
          }
        } else {
          thumbnail = thumbs.addThumb(e.target.result, true)
        }

        $.data(file, thumbnail)
      };
    })(i);
		
		// Reading the file as a DataURL. When finished,
		// this will trigger the onload function above:
		reader.readAsDataURL(file);
		
		// Associating a preview container
		// with the file, using jQuery's $.data():
		//$.data(file,preview);
  },
  addThumbPreview: function($el, src) {
    $el.css({
      background: 'url('+src+') no-repeat center center'
    })
    $el.removeClass('preview')
    return $el
  },
  init: function() {
    thumbs.cont = $('.thumbs')
    var ts = thumbs.cont.find('.thumb, .thumb img')
    ts.live('dragstart', function(e) {
      e.preventDefault()
      e.stopPropagation()
    })
    ts.live('click', function(e) {
      console.log(this)
      e.preventDefault()
      e.stopPropagation()
    })
    $.getJSON('/get-serving-urls', function(data) {
      for(var i in data) {
        thumbs.addThumb(data[i])
      }
    })
  }
}
