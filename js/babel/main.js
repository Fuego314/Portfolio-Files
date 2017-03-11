'use strict';

$(function () {
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
  $('.nav-link[href^="#"], .overlay a[href^="#"]').click(function (e) {
    // Prevent default anchor click behavior
    e.preventDefault();

    // Get window width on click
    var windowWidth = $(window).width();

    if (windowWidth < 768 && this.className === 'nav-link') {
      navToggle();
    }

    // Get offset
    var navOffset = 0;

    if (windowWidth < 768 && $(this).attr('href') !== '#about') {
      navOffset = 58;
    }

    // Store hash
    var hash = this.hash;

    $('html, body').animate({
      scrollTop: $(this.hash).offset().top - navOffset
    }, 700, function () {

      // When done, add hash to url
      // (default click behaviour)
      window.location.hash = hash;
    });
  });

  // Set heights for header and video
  var headerHeight = window.innerHeight,
      navMain = $('nav');

  $('#header').css('height', headerHeight);
  $('video').css('max-height', $('#header').css('height'));

  // Change navigation opacity on scroll function
  function showNav(height) {
    if (height > headerHeight - 3) {
      if (navMain.hasClass('transparent')) {
        navMain.removeClass('transparent').addClass('opaque').css('background', 'rgba(81, 81, 81, 1)');
        if ($('.navbar').hasClass('open')) navToggle();
      }
    } else {
      if (navMain.hasClass('opaque')) {
        navMain.removeClass('opaque').addClass('transparent').css('background', 'rgba(81, 81, 81, .4)');
      }
    }
  }

  showNav($(window).scrollTop());

  $(window).scroll(function () {
    var scroll = $(this).scrollTop();
    showNav(scroll);
  });

  // Switch between mobile and full navbar
  $(window).resize(function () {
    var navbar = $('.navbar'),
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
    if (innerWidth < 768) {
      $('.preview-info').css('opacity', '0');
    }
  });

  // Show nav toggle animation and open close menu on click
  $('.navbar-toggle').unbind().click(function () {
    return navToggle();
  });

  $('.tool').mouseover(function () {
    $(this).css('z-index', '4');
  });

  $('.tool').each(function () {
    var _this = this;

    $(this).mouseleave(function () {
      $(_this).css('z-index', '1');
    });
  });

  $('.preview').mouseenter(function () {
    $(this).addClass('hover');
    if ($(window).width() < 768) {
      $('.preview.' + this.classList[1] + ' .preview-info').css('opacity', '1');
    }
  }).mouseleave(function () {
    $(this).removeClass('hover');
    if ($(window).width() < 768) {
      setTimeout(function () {
        $('.preview-info').css('opacity', '0');
      }, 50);
    }
  });

  var showingMore = false;
  $('.see-more').click(function () {
    $('.work-display').toggleClass('showing-more');
    showingMore = !showingMore;
    if (showingMore) {
      $('.see-more h4').text('show less projects');
      $('.see-more img').css('transform', 'rotateZ(180deg)');
    } else {
      $('.see-more h4').text('show more projects');
      $('.see-more img').css('transform', 'rotateZ(0deg)');
    }
  });
});