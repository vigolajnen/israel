(function () {

  var mySwiper = new Swiper('#reviews', {
    slidesPerView: 1,
    grabCursor: true,
    spaceBetween: 0,

    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

})();


(function() {

  'use strict';

  // breakpoint where swiper will be destroyed
  // and switches to a dual-column layout
  var breakpoint = window.matchMedia( '(min-width:1340px)' );

  // keep track of swiper instances to destroy later
  var mySwiper;


  var breakpointChecker = function() {

    // if larger viewport and multi-row layout needed
    if ( breakpoint.matches === true ) {

      // clean up old instances and inline styles when available
	  if ( mySwiper !== undefined ) mySwiper.destroy( true, true );

	  // or/and do nothing
	  return;

      // else if a small viewport and single column layout needed
      } else if ( breakpoint.matches === false ) {

        // fire small viewport version of swiper
        return enableSwiper();

      }

  };

  var enableSwiper = function() {

    mySwiper = new Swiper ('#live', {
      slidesPerView: 1,
      loop: true,
      centeredSlides: true,
      keyboardControl: true,
      grabCursor: true,

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        paginationClickable: true,
      },

      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        960: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }

    });

  };

  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  // keep an eye on viewport size changes
  breakpoint.addListener(breakpointChecker);

  // kickstart
  breakpointChecker();



})(); /* IIFE end */