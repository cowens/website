$('#staff-member-carousel').slick({
  infinite: false,
  useTransform: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  cssEase: 'ease-in-out',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
]
});


var header = $('#fixed-header');
var headerCollapsed = false;
var awesomeCounter = 0;
$( document ).ready(function() {
    //
    // Collapse and expand the static / fixed header depending on the scrollTop position
    //
    $( window ).scroll(function() {
      var scrollTopPos = $(window).scrollTop();
      if (scrollTopPos > 78 && !headerCollapsed) { // 155 (expanded header) - 77 (collapsed header)
        header.addClass('collapsed');
        headerCollapsed = true;
      } else if (scrollTopPos <= 78 && headerCollapsed) {
        header.removeClass('collapsed');
        headerCollapsed = false;
      }
    });
    
    //
    // Show a full-screen width background behind the second level navigation
    // If anyone has a better idea how to do this cleaner/using only CSS, ideas
    // are welcome (PS: 'width: 100vw;' didn't do the trick for a number of reasons)
    //
    if($('#fixed-header nav.site-navbar .nav-item.active ul').length) {
      $('#fixed-header nav.site-navbar .nav-item.active ul').addClass('borderless')
      $('#submenu-background').show();
    }
    $('#fixed-header nav.site-navbar .nav-item').hover(function() {
      var ul = $(this).find('ul')
      if (ul.length) {
        ul.addClass('borderless');
        $('#submenu-background').show();
      }
    }, function() {
      //$(this).find('ul').css('visibility', 'hidden');
      if(!$('#fixed-header nav.site-navbar .nav-item.active ul').length)
        $('#submenu-background').hide();
    })
    
    //
    // Support for mobile hamburger nav
    //
    $( '.navbar-toggle' ).on( 'click', function() {
      if ( $(this).hasClass('collapsed') ) {
        // expand the mobile nav layer
        $(this).removeClass('collapsed');
        $('.mobile-nav').removeClass('collapsed');
      } else {
        // collapse the mobile nav layer
        $(this).addClass('collapsed');
        $('.mobile-nav').addClass('collapsed');
      }
      
    });
    
    //
    // Join / FAQ page
    //
    $( ".join-page .answers .answer:not(.application)" ).hide();
    $( ".join-page .faqs a" ).on( "click", function() {
      var hash = this.hash.substr(1);
      // Hide all the answers that are not this one
      $( ".join-page .answers .answer:not(." + hash + ")" ).hide();
      $( ".join-page .answers .answer." + hash).show();
      // Remove the 'active' class from all list elements and then
      // only add it to the one to which it applies
      $( ".join-page .faqs li" ).removeClass('active');
      $( ".join-page .faqs li" ).has( "a[href$='#" + hash + "']" ).addClass('active');
    });
    
    //
    // Catch all outgoing liks that are not to .gov, .mil, facebook.com, github.com, or twitter.com
    // and display a "you are now leaving..." message
    //
    $( 'a[href^="http"]:not(.target-link)' ).on( "click", function() {
      var domain = this.href.split('/')[2];
      var tld = domain.substring(domain.length - 3);
      if (tld != 'gov' && tld != 'mil' && domain != 'facebook.com' && domain != 'github.com' && domain != 'twitter.com') {
        $( '#site-alert-overlay' ).show();
        $( '#site-alert' ).show();
        var targetLink = $( '#site-alert .target-link')
        targetLink.text(this.href);
        targetLink.attr("href", this.href);
        return false;
      }
    });
    $( '#site-alert .close, #site-alert .target-link, #site-alert-overlay' ).on( "click", function() {
      $( '#site-alert-overlay' ).hide();
      $( '#site-alert' ).hide();
    });
    
    
    $('.everything-is-awesome').on( "click", function() {
      // Yes, there were more important things to get done, but everyone needs a mental break sometimes
      if (awesomeCounter >= 10) {
        window.open('https://www.youtube.com/watch?v=StTqXEQ2l-Y');
        $('.ted-teaser').show();
      }
      // Not yet awesome
      awesomeCounter++;
    });
    
    
});