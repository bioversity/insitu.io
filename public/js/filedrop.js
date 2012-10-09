var filedrop = {
  dragging: false,
  bindFiledrop: function() {
    $(document).filedrop({
      // The name of the $_FILES entry:
      paramname:'file',
      
      maxfiles: 25,
      maxfilesize: 20, // in MB
      url: '', // needs to get it from appengine
      dragOver: function() {
        // user dragging files over #dropzone
        if(!filedrop.dragging) {
          thumbs.addThumb(false, true)
        }
        filedrop.dragging = true
      },
      docLeave: function() {
        // user dragging files out of #dropzone
        if(!filedrop.dropped) {
          thumbs.removeThumb()
        }
        filedrop.dragging = false
        filedrop.dropped = false
      },
      drop: function() {
        filedrop.dropped = true
      },
      uploadFinished:function(i,file,response){
        //parent.window.location = "photos.html";
        // response is the JSON object that post_file.php returns
      },
      
      error: function(err, file) {
        switch(err) {
          case 'BrowserNotSupported':
            alert('Your browser does not support HTML5 file uploads!');
            break;
          case 'TooManyFiles':
            alert('Too many files! Please select 5 at most! (configurable)');
            break;
          case 'FileTooLarge':
            alert(file.name+' is too large! Please upload files up to 2mb (configurable).');
            break;
          default:
            break;
        }
      },
      
      // Called before each upload is started
      beforeEach: function(file){
        /*
        if(!file.type.match(/^image\//)){
          alert('Only images are allowed!');
          
          // Returning false will cause the
          // file to be rejected
          return false;
        }
        */
      },
      
      uploadStarted:function(i, file, len){
        thumbs.preview(i, file)
      },
      
      progressUpdated: function(i, file, progress) {
      }
         
    });
  },
  init: function() {
    filedrop.bindFiledrop()
  }
}
