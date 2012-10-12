var form = {
  inputs: false,
  disableInputs: function() {
    $('.error').hide()
    form.inputs.addClass('disabled')
        .prop('disabled', true)

  },
  enableInputs: function() {
    form.inputs.removeClass('disabled') 
      .prop('disabled', false)
  },
  init: function() {
    $('form').live('submit', function(e) {
      var $this = $(this)
      form.inputs = $('input[type=submit]')
      form.disableInputs()

      $.post($this.attr('action'), $this.serialize(),
        function(data) {
          form.enableInputs()

          modal.close()
          thumbs.reloadFiles()
        }
      ).error(function(jqXHR, textStatus, errorThrown) {
        $('.error').show().text(errorThrown)
        form.enableInputs()
      })

      e.preventDefault()
    })
  }
}
