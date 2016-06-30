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
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
var mousePosition = {
  x:0,
  y:0
};
var manual = false;
var deltaX = 0, deltaY = 0;
$(".status2").html(isMobile.any());
if(window.DeviceOrientationEvent && isMobile.any()){
  window.addEventListener("deviceorientation", orientation, false);
}else{
  console.log("DeviceOrientationEvent is not supported");
}
function orientation(event){
  $('.status').html("Magnetometer: "
    + Math.floor(event.alpha) + ", "
    + Math.floor(event.beta) + ", "
    + Math.floor(event.gamma)
  );
  if(manual){
    setTimeout(function(){
      camera.position.x = deltaX -event.gamma/200 ;
      camera.position.y =  deltaY - event.beta/20 ;
    },4)
  }
}
if (isMobile.any()== null){
  document.addEventListener("mousemove", function(event){
        mousePosition.x = event.clientX / 1000;
        mousePosition.y = 8 + event.clientY / 1000;
  });
}
