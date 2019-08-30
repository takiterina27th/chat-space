$(function(){
  function buildHTML(message){
    var insertImage = message.image.url ? `<img src="${message.image.url}">` : '';
    var html = `<div class="main__messages__message" data-id="${message.id}">
                  <div class="main__messages__message__info">
                    <div class="main__messages__message__info--username">
                      ${message.user_name}
                    </div>
                    <div class="main__messages__message__info--time">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="main__messages__message--message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                      ${insertImage}
                  </div>
                </div>`
    return html;
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__messages').append(html);
      $('.new_message')[0].reset();
      $('.main__form__new-message--submit-btn').prop('disabled', false);
      $('.main__messages').animate({scrollTop: $('.main__messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
  });
  var reloadMessages = function() {
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.main__messages__message:last').data('id')

      $.ajax({
        url: 'api/messages',
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    };  
  };
  setInterval(reloadMessages, 5000);
})