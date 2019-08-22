$(document).ready(function(){
  // oh no please don't look at this it's so horrible dear god why
  $('.drawer').drawer();

  $("#i1").hide();

  $("#h1").hide();
  $("#h2").hide();

  $("#p1").hide();
  $("#p2").hide();
  $("#p3").hide();
  $("#p4").hide();
  $("#p5").hide();

  $("#h1").delay(0).fadeIn(1000);

  $("#i1").delay(1000).fadeIn(1000);

  $("#p1").delay(1000).fadeIn(1000);
  $("#p2").delay(1000).fadeIn(1000);
  $("#p3").delay(1000).fadeIn(1000);
  $("#p4").delay(1000).fadeIn(1000);

  $("#h2").delay(2000).fadeIn(1000);
  $("#p5").delay(2000).fadeIn(1000);


});
