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
  });
  $(".fold-actions").animate({"opacity":"0"}, 300);
}
$(document).bind('mousewheel', function(evt) {
  var scrollTop = $(window).scrollTop();
    if (first){
      changeScene();
      showHeader();
      first = false;
      console.log('scrolling');
    }
    if (scrollTop>=$(document).height()-$(window).height()-190){
      $(".footer").addClass("shown");
    } else {
      $(".footer").removeClass("shown");
    }

});
function showHeader(){
  $('.header').addClass('shown');
}
$(window).on('unload', function() {
    $(window).scrollTop(0);
});
