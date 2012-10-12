var thumbs = {
  cont: null, // container
  left: null,
  right: null,
  onLeft: true,
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  addThumb: function(src, prepend) {
    var title = 'Ciao'
    if($.isPlainObject(src)) {
      var url = src.url
      title = src.title || title
      src = src.thumbUrl
    }
    var $img = $('<img>').attr({
      src: src
    }).appendTo('.thumbs').css({ display: 'none' })

    var $div = $('<div class="thumb"></div>')
    $div.append('<div class="block">'+title+'</div>')

    if(url) {
      $div.click(function(e) {
        window.location = url
      })
    }

    if(!this.onLeft) {
      cont = thumbs.right
      this.onLeft = true
    } else {
      cont = thumbs.left
      this.onLeft = false
    }
    if(prepend) {
      cont.prepend($div)
    } else {
      cont.append($div)
    }
    $img.load(function load() {
      var cont;
      var height = thumbs.getRandomInt(200, $img.height())
      $div.css({ 
        height: height,
        'background-image': 'url('+src+')'
      })
    })
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
      height: 250
    })
    $div.addClass('preview')
    $div.css({
      background: '#F4F886'
    })
    thumbs.left.prepend($div)
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
      'background-image': 'url('+src+')',
      'background-size': 'cover'
    })
    $el.removeClass('preview')
    return $el
  },
  reloadFiles: function() {
    thumbs.onLeft = true
    thumbs.left.html('')
    thumbs.right.html('')
    $.getJSON('/get-files', function(data) {
      for(var i in data) {
        thumbs.addThumb(data[i])
      }
    })
  },
  init: function() {
    thumbs.cont = $('.thumbs')
    thumbs.left = $('.thumbs_left')
    thumbs.right = $('.thumbs_right')
    var ts = thumbs.cont.find('.thumb, .thumb img')
    ts.live('dragstart', function(e) {
      e.preventDefault()
      e.stopPropagation()
    })
    ts.live('click', function(e) {
      e.preventDefault()
      e.stopPropagation()
    })
    
    this.reloadFiles()
  }
}
