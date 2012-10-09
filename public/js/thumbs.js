var thumbs = {
  cont: null, // container
  addThumb: function(src, prepend) {
    var $div = $('<div class="thumb"></div>')
    $div.css({
      width: 250,
      height: 250
    })
    if(src) {
      var $img = $('<img src="'+src+'" />')
      $img.css({
        zoom: 0.8,
        opacity: 0,
        width: 250,
        height: 250

      })
    } else {
      $div.addClass('preview')
      $div.css({
        background: '#F4F886'
      })
    }

    if(src) $div.append($img)
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
      }, 300)
    }
    if(src) $img.load(load)
    return $div
  },
  removeThumb: function(end) {
    $('.preview').animate({
      opacity: 0
    }, function() {
      $(this).remove()
    })
  },
  preview: function(i, file) {
		var reader = new FileReader();
		
    (function(i) {
      console.log(i)
      reader.onload = function(e){
        
        // e.target.result holds the DataURL which
        // can be used as a source of the image:
        if(i === 0) { // use the existing yellow preview thumb
          var $div = $('.preview')
          $img = $('<img />')
          $img.attr('src', e.target.result)
          $img.css({
            width: 250,
            height: 250
          })
          $div.append($img)
        } else {
          thumbs.addThumb(e.target.result, true)
        }

      };
    })(i);
		
		// Reading the file as a DataURL. When finished,
		// this will trigger the onload function above:
		reader.readAsDataURL(file);
		
		// Associating a preview container
		// with the file, using jQuery's $.data():
		//$.data(file,preview);
  },
  init: function() {
    $.getJSON('/get-serving-urls', function(data) {
      thumbs.cont = $('.thumbs')
      for(var i in data) {
        thumbs.addThumb(data[i] + '=s250-c')        
      }
    })
  }
}
