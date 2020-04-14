window.onload=function(){
    var mySwiper = new Swiper ('.swiper-container', {
        // direction: 'vertical', // 垂直切换选项horizontal
        loop: true, // 循环模式选项,环形切换
        effect:'coverflow',//滑动效果fade,flip,slide,cube,coverflow
        speed:800, //滑动或者自动换页时的速度

        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          clickable:true,
          type:'bullets',
        },
        autoplay:true,//自动切换，默认3000ms
        paginationClickable:true,
        autoplayDisableOnInteraction:false,
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        

        // 如果需要滚动条
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // },
      });    
}

var nav=document.getElementById("nav");
  var navTop=nav.offsetTop;

$(window).scroll(function(){
    var scroll1=document.documentElement.scrollTop ||document.body.scrollTop;
    // console.log(scroll1);
    var backTop1=$("#world").offset().top-$(window).height()/3;
    var backTop2=$("#star").offset().top-$(window).height()/3;
    var backTop3=$("#accessory").offset().top-$(window).height()/4;
    if(scroll1 > backTop1){
        $(".a1").addClass("animated bounceInRight show").removeClass("hide");
        $(".a2").addClass("animated bounceInDown show").removeClass("hide");
        $(".a3").addClass("animated bounceInUp show").removeClass("hide");
        $(".a4").addClass("animated bounceInLeft show").removeClass("hide");
    }
    if(scroll1 > backTop2){
        $(".b1").addClass("animated bounceInRight show").removeClass("hide");
        $(".b2").addClass("animated bounceInDown show").removeClass("hide");
        $(".b3").addClass("animated bounceInUp show").removeClass("hide");
        $(".b4").addClass("animated bounceInLeft show").removeClass("hide");
    }
    if(scroll1 > backTop3){
        $(".c1").addClass("animated bounceInRight show").removeClass("hide");
        $(".c2").addClass("animated bounceInDown show").removeClass("hide");
        $(".c3").addClass("animated bounceInUp show").removeClass("hide");
        $(".c4").addClass("animated bounceInLeft show").removeClass("hide");
        $(".c5").addClass("animated bounceInDown show").removeClass("hide");
        $(".c6").addClass("animated bounceInRight show").removeClass("hide");
        $(".c7").addClass("animated bounceInLeft show").removeClass("hide");
        $(".c8").addClass("animated bounceInUp show").removeClass("hide");
    }
});

window.onscroll=function(){scrollFunction()};

function scrollFunction(){
  // console.log(121);
  if(document.body.scrollTop>20||document.documentElement.scrollTop>20)
  {
    document.getElementById("myBtn").style.display="block";
  }
  else 
  {
    document.getElementById("myBtn").style.display="none";
  }

  // 吸顶灯效果
  var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
  if(scrollTop>=navTop)
  {
    nav.style.position="fixed";
    nav.style.top="0";
    nav.style.left="0";
    nav.style.zIndex="100";
    nav.style.width="100%";
  }
  else
  {
    nav.style.position="";
  }
}

function topFunction(){
  var timer=setInterval(function(){
    var backTop=document.documentElement.scrollTop||document.body.scrollTop;
    var speedTop=backTop/5;
    document.documentElement.scrollTop=backTop-speedTop;
    if(backTop==0)
    {
      clearInterval(timer);
    }
  },30);
}