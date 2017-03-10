$(function() {
  "use strict";

  // Init animsition
  $('.animsition').animsition({
    inClass: 'fade-in',
    inDuration: 1500,
    loading: false
  });

  // Nav toggle animation and open close menu
  function navToggle() {
    $('.top-bar').toggleClass('top-bar-open');
    $('.middle-bar').toggleClass('middle-bar-open');
    $('.bottom-bar').toggleClass('bottom-bar-open');
    $('nav').toggleClass('open');
  }

	// Animate on scroll
	$('.nav-link[href^="#"], .overlay a[href^="#"]').click(function(e) {
		// Prevent default anchor click behavior
    e.preventDefault();

    // Get window width on click
    let windowWidth = $(window).width();

    if (windowWidth < 768 && this.className === 'nav-link') {
      navToggle();
    }

    // Get offset
		let navOffset = 0;

    // Store hash
    let hash = this.hash;

    $('html, body').animate({
      scrollTop: $(this.hash).offset().top
    }, 700, function(){

      // When done, add hash to url
      // (default click behaviour)
      window.location.hash = hash;

    });
  });

  // Set heights for header and video
  let headerHeight = window.innerHeight,
	 		navMain = $('nav');

  $('#header').css('height', headerHeight);
  $('video').css('max-height', $('#header').css('height'));

  // Change navigation opacity on scroll function
  function showNav(height) {
    if (height > headerHeight - 3) {
      if (navMain.hasClass('transparent')) {
        navMain.removeClass('transparent')
               .addClass('opaque')
               .css('background', 'rgba(81, 81, 81, 1)');
        if ($('.navbar').hasClass('open')) navToggle();
      }
    } else {
      if (navMain.hasClass('opaque')) {
        navMain.removeClass('opaque')
               .addClass('transparent')
               .css('background', 'rgba(81, 81, 81, .4)');
      }
    }
  }

  showNav($(window).scrollTop());

  $(window).scroll(function() {
    let scroll = $(this).scrollTop();
    showNav(scroll);
  });

	// Switch between mobile and full navbar
	$(window).resize(() => {
		let navbar = $('.navbar'),
        nav = $('nav');

		if (innerWidth >= 768) {
			navbar.addClass('full');
      $('.preview-info').css('opacity', '1');

			// If nav menu is open when switches to full nav close it
		  if (nav.hasClass('open')) {
    		$('.top-bar').removeClass('top-bar-open');
				$('.middle-bar').removeClass('middle-bar-open');
				$('.bottom-bar').removeClass('bottom-bar-open');
        nav.toggleClass('open');
			}
		}
    if(innerWidth < 768) {
      $('.preview-info').css('opacity', '0');
    }
	});

	// Show nav toggle animation and open close menu on click
  $('.navbar-toggle').unbind().click(() => navToggle());


  $('.tool').mouseover(function() {
    $(this).css('z-index', '4');
  });

	$('.tool').each(function() {
		$(this).mouseleave(() => {
      $(this).css('z-index', '1')
    });
	});

  $('.preview').mouseenter(function() {
    $(this).addClass('hover');
    if($(window).width() < 768) {
      $(`.preview.${this.classList[1]} .preview-info`).css('opacity', '1');
    }
  }).mouseleave(function() {
    $(this).removeClass('hover');
    if($(window).width() < 768) {
      setTimeout(function() {
        $('.preview-info').css('opacity', '0');
      }, 50);
    }
  });

});
