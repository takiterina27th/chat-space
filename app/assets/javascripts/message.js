$(function(){
  function buildHTML(message){
      if (message.image) {
        var html = `<div class="main__messages__message">
                      <div class="main__messages__message__info">
                        <div class="main__messages__message__info--username">
                          ${message.name}
                        </div>
                        <div class="main__messages__message__info--time">
                          ${message.date}
                        </div>
                      </div>
                      <div class="main__messages__message--message">
                        <p class="lower-message__content">
                          ${message.content}
                        </p>
                          <image src="${message.image}"/>
                      </div>
                    </div>`
        return html;            
      } else {
        var html = `<div class="main__messages__message">
                      <div class="main__messages__message__info">
                        <div class="main__messages__message__info--username">
                          ${message.name}
                        </div>
                        <div class="main__messages__message__info--time">
                          ${message.date}
                        </div>
                      </div>
                      <div class="main__messages__message--message">
                        <p class="lower-message__content">
                          ${message.content}
                        </p>
                      </div>
                    </div>`
        return html;
      };  
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
        console.log(data)
        var html = buildHTML(data);
        $('.main__messages').append(html);
        $('.main__form__new-message__input-box--text').val('');
        $('.main__form__new-message--submit-btn').prop('disabled', false);
        $('.main__messages').animate({scrollTop: $('.main__messages')[0].scrollHeight}, 'fast');
      })
      .fail(function(){
        alert('error');
      })
  });
})