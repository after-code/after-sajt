var foldShown = false;
function showActions(){
  setTimeout(function(){
    $(".fold-actions").animate({"top":"-100%"},600, 'easeInOutCubic', function(){
      foldShown = true;
    });
    $(".main-heading").animate({"opacity":"1"},600, 'easeInOutCubic');
  },100);
}
var first = true;

function changeScene(){
  $("body").animate({scrollTop: $(".viewport").height()},600, 'easeInOutCubic', function(){
    $("body").css({"overflow-y":"scroll"});
    first = false;
    console.log('finished');
    if (foldShown){
      // $(".fold-actions").css({"display":"none"});
    }
  });
  $(".fold-actions").animate({"opacity":"0"}, 300);
  if (!foldShown){
    // $(".fold-actions").css({"display":"none"});
  }
}
$(document).bind('mousewheel', function(evt) {
    if (first){
      changeScene();
      first = false;
      console.log('scrolling');
    }
});
$(window).on('unload', function() {
    $(window).scrollTop(0);
});
