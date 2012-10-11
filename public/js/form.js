var form = {
  init: function() {
    $('form').live('submit', function(e) {
      var $this = $(this)
      var $inputs = $('input[type=submit]')

      $inputs.addClass('disabled')
          .prop('disabled', true)

      $.post($this.attr('action'), { 
          url: $this.find('input[name=url]').val(),
        },
        function(data) {
          $inputs.removeClass('disabled') 
            .prop('disabled', false)

          modal.close()
          thumbs.reloadFiles()
        }
      )

      e.preventDefault()
    })
  }
}
