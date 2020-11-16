$(document).ready(function(){
  // oh no please don't look at this it's so horrible dear god why
  $('.drawer').drawer();

  $("#i1").hide();

  $('#index h1').hide();
  $('#index h2').hide();
  $('#index p').hide();
  $('#index footer').hide();

  $("#index h1").delay(0).fadeIn(1000);
  $("#index h2").delay(1000).fadeIn(1000);
  $("#index p").delay(1000).fadeIn(1000);
  $("#index footer").delay(1000).fadeIn(1000);
});
