$(document).ready(function(){
// timeago Settings
  $("time.timeago").timeago();
  $.timeago.settings.allowFuture = true;

// sweetalert Settings
// swal({
//  title: "Hey!",
//  text: "You can't tweet an empty tweet!",
//  type: "error",
//  confirmButtonText: "Okay, fine..."
// });

// show tweet controls when clicking into a compose box
$('#compose-box').on('click',function(){
    $('#tweet-controls').show();
});

// track the character count remaining
$('.tweet-compose')
  .on('keydown keyup keypress',function(){
  	var charCount = 140 - $('.tweet-compose').val().length;
  	$('#char-count').text(charCount);
    if (charCount <= 10) {
      $('#char-count').css('color','red');
    }
    if (charCount > 10) {
      $('#char-count').css('color','#999');
    }
    if (charCount < 0) {
      $('#tweet-submit').prop('disabled', true);
    }
    if (charCount >= 0) {
      $('#tweet-submit').prop('disabled', false);
    }
  })
// hide the tweet button and char count when you click away
  .focusout(function(){
    $('#tweet-controls').delay(400).fadeOut('fast');
  });

// add newly written tweet to the twitter stream
$('#tweet-submit').on('click', function(){
  if($('.tweet-compose').val() === ''){
    swal("Hey!", "You can't tweet an empty tweet!","error","Okay, fine...");
  } else{
  $('#stream').prepend(
    // tweet content
    '<div class="tweet">' +
      '<div class="content">' +
        '<img class="avatar" src="img/alagoon.jpg" />' +
        '<strong class="fullname">Sean Hoffman</strong>'+
        '<span class="username">@seanhoffman</span>'+
        '<p class="tweet-text">' + $(".tweet-compose").val() + '</p>' +
        '<div class="tweet-actions">' +
          '<ul>' +
            '<li><span class="icon action-reply"></span> Reply</li>' +
            '<li><span class="icon action-retweet"></span> Retweet</li>' +
            '<li><span class="icon action-favorite"></span> Favorite</li>' +
            '<li><span class="icon action-more"></span> More</li>' +
          '</ul>' +
        '</div>' +
        '<div class="stats">' +
          '<div class="retweets">' +
            '<p class="num-retweets">30</p>' +
            '<p>RETWEETS</p>' +
          '</div>' +
          '<div class="favorites">' +
            '<p class="num-favorites">6</p>' +
            '<p>FAVORITES</p>' +
          '</div>' +
          '<div class="users-interact">' +
            '<div>' +
              '<img src="img/jennyshen.jpg" />' +
            '  <img src="img/damenleeturks.jpg" />' +
            '</div>' +
          '</div>' +
          '<div class="time">' +
          '<time class="timeago" datetime="' + $.timeago(new Date()) + '">' +  $.timeago(new Date()) +
          '</time>' +
          '</div>' +
        '</div>' +
        '<div class="reply">' +
          '<img class="avatar" src="img/alagoon.jpg" />' +
          '<textarea class="tweet-compose" placeholder="Reply to @seanhoffman"/></textarea>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
  // reset the tweet compose box after submitting
  $('.tweet-compose').val('');
  $('#char-count').html(140);
}
});

// Show tweet stats when clicking on that tweet
$('#stream').on('click', '.tweet', function(e){
  $('.stats').hide();
  if (!$(e.target).is('.tweet-compose')) {
    $(this).find('.stats').show();
  }
});
// hide tweet stats when clicking away from that tweet
// .on('click', '.tweet', function(e){
//   if (!$(e.target).is(this)){
//     $('.stats').find('.stats').hide();
//   }
// });

});
