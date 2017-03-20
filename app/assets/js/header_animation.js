$(function(){
  setTimeout(function(){
    $('.st3').velocity({'stroke-dashoffset':'0'},2200, [200, 20]);
    $('.st10').velocity({'stroke-dashoffset':'0'},2200, [200, 20]);
    $('.st12').velocity({'stroke-dashoffset':'0'},2200, [200, 20]);
    setTimeout(function(){
      $('.st5').velocity({'stroke-dashoffset':'0'},2200, [200, 20]);
      $('.st8').velocity({'stroke-dashoffset':'0'},2200, [200, 20]);
      $('.st11').velocity({'stroke-dashoffset':'0'},2200, [200, 20]);
    },1300)
    setTimeout(function(){
      $('.st11').velocity({'stroke-dashoffset':'0'},2200);
    },1600)
    setTimeout(function(){
      // $('.circle').css({'transform':'scale(13)'});
      $('.a-wave').css({'transform':"scale(2.5)  translateY(-20%)"},1000);
      setTimeout(function(){
        $(".a-solid").css({opacity:"1"});
        $(".a-wave").css({display:'none'});
        $(".a-mask").css({display:'none'});
        $('.circle').css({'transform':'scale(13)'});
      },1800)
    },1600)
  },2200);
});
