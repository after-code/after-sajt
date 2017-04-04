$(function(){
  var menu_active = false;
  $(".menu-ico").click(function(){
    if (!$('.header__nav').hasClass("velocity-animating")) {
      if (!menu_active){
        $('.header__nav').css({display:"block"});
        $('.header__nav').velocity({opacity:"1"},200);
        $('.menu-ico').addClass("active");
        $('.after-logo').addClass("active");
      } else {
        $('.header__nav').velocity({opacity:"0"},200, function(){
          $('.header__nav').css({display:"none"});
        });
        $('.after-logo').removeClass("active");
        $('.menu-ico').removeClass("active");
      }
      menu_active = !menu_active;
    }

  });
  $line = $('.go-down-line');
  $lines = $('.b-heading-animation__lines');
  function animationStart(){
    if($(window).width()>1024) {
      $lines.velocity({
        translateY:["-0.8%", "-2.1%"]
      },
      {
        duration:1000,
        delay:0,
        easing: "linear",
        complete:animationStart
      });


    } else {
      $lines.velocity({
        translateY:["-0.8%", "-2.1%"]
      },
      {
        duration:10000,
        delay:0,
        easing: "linear",
        complete:animationStart
      });
    }
  }
  animationStart();
  setTimeout(initAnimation, 500);
  function initAnimation(){
    $(".b-heading-animation__lines").animate({opacity:"1"}, {duration:1500})
    setTimeout(function(){
      $(".b-heading-animation__typo").animate({opacity:"1"}, {duration:3000})
    },1100)
    setTimeout(function(){
      $(".header .after-logo").animate({opacity:"1"}, {duration:600})
      $(".menu-ico").animate({opacity:"1"}, {duration:600})
      $(".go-down-line").animate({opacity:"1"}, {duration:600})
    },1800)
  }
  $(".b-mediabox-slider").slick({
    arrows:false,
    autoplay:true,
    autoplaySpeed:5000,
    speed:1500,
    pauseOnHover:false
  });
});
