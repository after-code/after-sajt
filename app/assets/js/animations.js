var foldShown = false;
function showActions(){
  setTimeout(function(){
    $(".fold-actions").animate({"bottom":"0px"},900, 'easeInOutExpo', function(){
      foldShown = true;
    });
    $(".main-heading").animate({"opacity":"1"},900, 'easeInOutExpo');
  },400);
}
var first = true;

function changeScene(){
  $("body").animate({scrollTop: $(".viewport").height()},1200, 'easeInOutCubic', function(){
    $("body").css({"overflow-y":"scroll"});
    console.log('finished');
    if (foldShown){
      $(".fold-actions").css({"display":"none"});
    }
  });
  if (!foldShown){
    $(".fold-actions").css({"display":"none"});
  }
}
$(document).bind('mousewheel', function(evt) {
    if (first){
      changeScene();
      first = false;
      console.log('scrolling');
    }
});
$(function(){
  // $("body, html").scrollTop(0);
  $(window).scrollTop(0);
  $("html").scrollTop(0);
  console.log("asfs");

});
setTimeout(function(){
   $(window).scrollTop(0);
},200);
