$(document).ready(function () {
    var options = {
        autoPlayDelay: 5000,
        animateStartingFrameIn: true,
        reverseAnimationsWhenNavigatingBackwards: false,
        nextButton: true,
        prevButton: true,
        showNextButtonOnInit: true,
        autoPlay: true
    };
  
    var sequence = $('#sequence').sequence(options).data('sequence');
    $('.loader').hide();

    $('.form_send').click(function(event) {
      event.preventDefault();
      $('.loader').show();
      
        var name = $('input#name').val();
        var email = $('input#email').val();
        var budget = $('select#budget').val();
        var message = $('textarea#message').val();
      
        if($('.contact-message').html() !== ''){
            $('.contact-message').attr('class', 'contact-message');
            $('.contact-message').html('');
            $('.contact-message').hide();
        }
      
        if (name === '' || name === ' ' || name === 'Name') {
            $('.contact-message').addClass('contact-error');
            $('.contact-message').html('Hey John Doe! We need to know your name please. Thank you');
            $('.contact-message').show();
            $('.loader').hide();
            return false;
        }
        
        if (email === '' || email === ' ') {
            $('.contact-message').addClass('contact-error');
            $('.contact-message').html('Uh oh! Looks like something’s wrong with the Email you gave.');
            $('.contact-message').show();
            $('.loader').hide();
            return false;
        }
        
        else if (!IsEmail(email)) {
            $('.contact-message').addClass('contact-error');
            $('.contact-message').html('Uh oh! Looks like something’s wrong with the Email you gave.');
            $('.contact-message').show();
            $('.loader').hide();
            return false;
        }
    
        if (message === '' || message === ' ' || message === 'Message') {
            $('.contact-message').addClass('contact-error');
            $('.contact-message').html('Dont be shy! Leave us a message about what you want to discuss.');
            $('.contact-message').show();
            $('.loader').hide();
            return false;
        }

        var mailerUrl = window.location.origin + '/mailer.php';

        $.ajax({
          url: mailerUrl,
          type: 'POST',
          data: {postName: name, postEmail: email, postBudget: budget, postMessage: message},
        })
        .done(function(data) {
          $('.contact-message').addClass('contact-success');
          $('.contact-message').html(data);
          $('.loader').hide();
        })
        .fail(function() {
          $('.contact-message').addClass('contact-error');
          $('.contact-message').html(data);
          $('.loader').hide();
        });
    
        $('.contact-message').show();
    });
});


        var docElem = document.documentElement,
        header = document.querySelector( '.site-header' ),
        didScroll = false,
        changeHeaderOn = 500;

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

function scrollshow(){
  var scrolled = $(window).scrollTop();
  if (scrolled >= 300 ) {
    $('.box').addClass('showscroll');
  }
}

$('.mob-nav-btn').click(function (e) {
    $('.main-nav').toggleClass('main-nav-open');
    e.preventDefault();
});

$(window).scroll(function(e){
    scrollshow();
});

  function IsEmail(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return filter.test(email);
  }

  $(window).scroll(function(e){
    if ($(window).width()>535){
      parallax();
    }
  });

function parallax(){
  var scrolled = $(window).scrollTop();
  if(scrolled>0){
    // $('.bg').css('top',-(scrolled*0.5)+'px');
    $('.masthead h1').css('top',-(scrolled*0.1)+'px');
    $('.masthead h1, .masthead .ctas').css('opacity',(5/scrolled*10));

    $('.masthead .ctas').css('top',-(scrolled*-0.5)+'px');
  }
}

$('.work_item, .case-study--design').bind('inview', function (event, visible) {
  if (visible == true) {
    $(this).addClass('inview');
  }
});