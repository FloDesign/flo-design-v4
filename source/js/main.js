$(window).scroll(function(e){
  scrollshow();
});
function scrollshow(){
  var scrolled = $(window).scrollTop();
   if (scrolled >= 500 ) {
    $('.box').addClass('showscroll');
   }
}

$(document).ready(function(){
         var options = {
            autoPlay: true,
            autoPlayDelay: 5000,
            animateStartingFrameIn: true,
            reverseAnimationsWhenNavigatingBackwards: false,
            nextButton: true,
            prevButton: true,
            showNextButtonOnInit: true
        }
        var sequence = $("#sequence").sequence(options).data("sequence");
    });

$(document).ready(function() {
var cbpAnimatedHeader = (function() {
 
    var docElem = document.documentElement,
        header = document.querySelector( '.site-header' ),
        didScroll = false,
        changeHeaderOn = 400;
 
    function init() {
        window.addEventListener( 'scroll', function( event ) {
            if( !didScroll ) {
                didScroll = true;
                setTimeout( scrollPage, 250 );
            }
        }, false );
    }
 
    function scrollPage() {
        var sy = scrollY();
        if ( sy >= changeHeaderOn ) {
            classie.add( header, 'shrink' );
        }
        else {
            classie.remove( header, 'shrink' );
        }
        didScroll = false;
    }
 
    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }
 
    init();
 
})();
}); // END DOCUMENT READY


$(".mob-nav-btn").click(function (e) {
      $(".main-nav").toggleClass("main-nav-open");
      e.preventDefault();
    });


$(window).scroll(function(e){
  parallax();
});
function parallax(){
  var scrolled = $(window).scrollTop();
  $('.bg').css('top',-(scrolled*0.3)+'px');
}







