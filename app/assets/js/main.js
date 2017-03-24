$(function(){
  var menu_active = false;
  $(".menu-ico").click(function(){
    console.log("????");
    if (!menu_active){
      $('.header__nav').css({display:"block"});
      $('.header__nav').animate({opacity:"1"},600);
    } else {
      $('.header__nav').animate({opacity:"0"},400, function(){
        $('.header__nav').css({display:"none"});
      });
    }
    menu_active = !menu_active;
  });
});
