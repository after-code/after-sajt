function showActions(){
  setTimeout(function(){
    $(".fold-actions").animate({"bottom":"0px"},900, 'easeInOutExpo');
    $(".main-heading").animate({"opacity":"1"},900, 'easeInOutExpo');
  },400);
}
var first = true;
function changeScene(){
  $("body").animate({scrollTop: $(".viewport").height()},1500, 'easeInOutExpo');
  $("body").css({"overflow-y":"scroll"});
}
$("body, html").scroll(function(){
  if (!first){
    changeScene();
    first = false;
  }
});
